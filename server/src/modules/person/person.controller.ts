import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonCreateInput } from './inputs/create.input';
import { PersonUpdateInput } from './inputs/update.input';
import { PersonLoginInput } from './inputs/login.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Person } from './person.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @HttpCode(201)
  create(@Body() input: PersonCreateInput) {
    return this.personService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @HttpCode(200)
  update(@Body() input: PersonUpdateInput, @Req() request: { user: Person }) {
    return this.personService.update(input, request.user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.personService.findAll();
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() input: PersonLoginInput) {
    return this.personService.login(input);
  }

  @Get('exists')
  exists(@Query() params: { login: string }) {
    return this.personService.loginExists(params?.login);
  }
}
