import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { Person } from '../person/person.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwt(user: Person): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }

  comparePassword(password: string, hash: string): Observable<boolean> {
    return from(bcrypt.compare(password, hash));
  }

  decodedToken(token: string): Observable<{ user: Person }> {
    return from(
      this.jwtService.verifyAsync<{ user: Person }>(token, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    );
  }
}
