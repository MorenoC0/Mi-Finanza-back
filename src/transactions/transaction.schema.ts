// src/transactions/transaction.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ ref: 'Category', required: true })
  categoryId: string; // Referencia a categoría predefinida

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['ingreso', 'gasto'] })
  type: 'ingreso' | 'gasto';

  @Prop({ trim: true })
  description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
