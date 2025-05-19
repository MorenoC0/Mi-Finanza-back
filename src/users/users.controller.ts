// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() user: User,
  ): Promise<{ message: string; user: Omit<User, 'password'> }> {
    // Verificar si el email ya existe
    const existingUser = await this.usersService.findByUsername(user.username);
    if (existingUser) {
      throw new HttpException(
        'El username ya está registrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Crear usuario
    const createdUser = await this.usersService.create(user);

    // Eliminar password de la respuesta
    const { password, ...userWithoutPassword } = createdUser.toObject();

    return {
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword,
    };
  }

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });
  
  }
  
}
