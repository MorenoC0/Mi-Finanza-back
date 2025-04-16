// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    // Encriptar contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    if (typeof user.password === 'string') {
      user.password = await bcrypt.hash(user.password, salt);
    } else {
      throw new Error('Password must be a string');
    }

    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findByEmail(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
