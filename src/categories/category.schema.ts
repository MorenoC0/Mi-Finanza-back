// src/categories/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: string;

  @Prop({ ref: 'User', required: true })
  userId: string; // Relación con el usuario dueño de la categoría
}

export const CategorySchema = SchemaFactory.createForClass(Category);
