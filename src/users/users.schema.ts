// src/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Añade createdAt y updatedAt automáticamente
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true, select: false }) // select: false evita que se devuelva en consultas
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
