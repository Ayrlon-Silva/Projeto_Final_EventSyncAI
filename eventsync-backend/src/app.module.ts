import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';

@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // Configura a conexão com o Banco de Dados (Postgres)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      
      port: parseInt(process.env.DB_PORT || '5432'),
      
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'eventsync',
      
      autoLoadEntities: true,
      synchronize: true,
    }),
    // Carrega os módulos do sistema
    UsersModule,
    EventsModule,
    AuthModule,
    InscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}