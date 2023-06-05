import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { AuthModule } from '../auth/auth.module';
import { PersonController } from './person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), AuthModule],
  providers: [PersonService],
  exports: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
