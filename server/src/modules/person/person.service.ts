import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { PersonCreateInput } from './inputs/create.input';
import { PersonUpdateInput } from './inputs/update.input';
import { PersonLoginInput } from './inputs/login.input';
import PersonTypes from './person-types';
import { Role } from '../auth/roles.enum';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly authService: AuthService,
  ) {}

  create(input: PersonCreateInput): Observable<Person> {
    return this.loginExists(input.login).pipe(
      switchMap((exists) => {
        if (!exists) {
          return this.authService.hashPassword(input.password).pipe(
            switchMap((hashPassword) => {
              input.password = hashPassword;
              return from(this.personRepository.save({ ...input })).pipe(
                map((person) => {
                  const { password, ...data } = person;
                  return data;
                }),
              );
            }),
          );
        } else {
          throw new HttpException(
            `Логин "${input.login}" занят.`,
            HttpStatus.CONFLICT,
          );
        }
      }),
    );
  }

  update(input: PersonUpdateInput, user: PersonTypes.Person): Observable<any> {
    return this.findOne(input.id).pipe(
      switchMap((person) => {
        if (!person) {
          return of(null);
        }

        if (Number(person.id) !== Number(user.id) && user.role !== Role.ADMIN) {
          throw new HttpException(
            `Недостаточно прав для изменения данных другого пользователя`,
            HttpStatus.FORBIDDEN,
          );
        }

        const { password, ...data } = input;
        const updateData = { ...data } as Partial<PersonTypes.Person>;

        if (Boolean(updateData.role) && user.role !== Role.ADMIN) {
          throw new HttpException(
            `Недостаточно прав для изменения роли пользователя`,
            HttpStatus.FORBIDDEN,
          );
        }

        if (password) {
          return this.authService.hashPassword(password).pipe(
            switchMap((hash) => {
              updateData.password = hash;
              return this.personRepository.update(
                { id: person.id },
                updateData,
              );
            }),
          );
        }
        return this.personRepository.update({ id: person.id }, updateData);
      }),
    );
  }

  registration(
    input: PersonCreateInput,
  ): Observable<{ token: string; person: Person }> {
    return this.create(input).pipe(
      switchMap(({ password, ...person }) => {
        return this.authService.generateJwt(person).pipe(
          map((token) => ({
            token,
            person,
          })),
        );
      }),
    );
  }

  verification(token: string): Observable<{ token: string; person: Person }> {
    return this.authService.decodedToken(token).pipe(
      switchMap((value) => {
        if (!value?.user) {
          throw new HttpException(
            `token is not valid`,
            HttpStatus.UNAUTHORIZED,
          );
        }
        return this.authService.generateJwt(value.user).pipe(
          map((newToken) => ({
            token: newToken,
            person: value.user,
          })),
        );
      }),
    );
  }

  login(
    input: PersonLoginInput,
  ): Observable<{ token: string; person: Person }> {
    return this.get_person_by_login(input.login).pipe(
      switchMap((person) => {
        if (!person) {
          throw new HttpException(
            `Пользователь "${input.login}" не найден.`,
            HttpStatus.NOT_FOUND,
          );
        }
        return this.validatePassword(input.password, person.password).pipe(
          switchMap((passwordMatches) => {
            if (passwordMatches) {
              return this.findOne(person.id!).pipe(
                switchMap((person) => {
                  const { password, ...data } = person;
                  return this.authService
                    .generateJwt(data)
                    .pipe(map((token) => ({ token, person: data })));
                }),
              );
            } else {
              throw new UnauthorizedException();
            }
          }),
        );
      }),
    );
  }

  findOne(id: number): Observable<Person> {
    return from(this.personRepository.findOne({ where: { id } }));
  }

  findAll(): Observable<Person[]> {
    return from(
      this.personRepository.find({
        select: {
          id: true,
          login: true,
          firstName: true,
          lastName: true,
          middleName: true,
          phone: true,
          email: true,
          role: true,
          password: false,
        },
      }),
    );
  }

  findByLogin(login: string): Observable<Person> {
    return from(
      this.personRepository
        .createQueryBuilder()
        .where('LOWER(login) = LOWER(:login)', { login })
        .getOne(),
    ).pipe(
      map((person) => {
        if (!person) {
          return null;
        }
        const { password, ...data } = person;
        return data;
      }),
    );
  }

  loginExists(login: string): Observable<boolean> {
    return from(this.findByLogin(login)).pipe(
      map((person) => {
        return Boolean(person);
      }),
    );
  }

  /** Приватеный метод, возвращает person в месте с паролем. */
  private get_person_by_login(login: string): Observable<Person> {
    return from(
      this.personRepository
        .createQueryBuilder()
        .where('LOWER(login) = LOWER(:login)', { login })
        .getOne(),
    );
  }

  private validatePassword(
    password: string,
    hash?: string,
  ): Observable<boolean> {
    return this.authService.comparePassword(password, String(hash));
  }
}
