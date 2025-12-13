import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importando os módulos que vamos criar (ou que você já gerou com o CLI)
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Configura o leitor de variáveis de ambiente (.env)
    ConfigModule.forRoot({
      isGlobal: true, // Deixa as variáveis disponíveis em todo o projeto
    }),

    // 2. Configura a conexão com o Banco de Dados (Postgres)
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Se não achar no .env, usa 'localhost'
      host: process.env.DB_HOST || 'localhost',
      
      // AQUI ESTAVA O ERRO: Adicionamos || '5432' para garantir que sempre tenha um texto
      port: parseInt(process.env.DB_PORT || '5432'),
      
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD, // Esse deixamos sem padrão para você notar se esquecer
      database: process.env.DB_NAME || 'eventsync',
      
      autoLoadEntities: true,
      synchronize: true,
    }),
    // 3. Carrega os módulos do seu sistema
    UsersModule,
    EventsModule,
    RegistrationsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}