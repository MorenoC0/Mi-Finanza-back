import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'jwt_secreto_super_seguro', // cambia esto o usa .env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
// Este módulo maneja la autenticación de usuarios, incluyendo el inicio de sesión y la generación de tokens JWT.
// Asegúrate de que el módulo de usuarios esté importado para poder acceder a los servicios de usuario.