import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { PersonModule } from './modules/person/person.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HdbkModule } from './modules/hdbk/hdbk.module';
import { OrderProcessingModule } from './modules/order-processing/order-processing.module';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      max: 20,
      ttl: 3600000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + config.get<string>('TYPEORM_ENTITIES')],
        migrations: [__dirname + config.get<string>('TYPEORM_MIGRATIONS')],
        migrationsTableName: config.get<string>(
          'TYPEORM_MIGRATIONS_TABLE_NAME',
        ),
        synchronize: Boolean(config.get<string>('TYPEORM_SYNCHRONIZE')),
        autoLoadEntities: true,
        logging: ['error', 'warn', 'query'],
      }),
    }),
    OrderModule,
    AuthModule,
    PersonModule,
    HdbkModule,
    OrderProcessingModule,
    PriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
