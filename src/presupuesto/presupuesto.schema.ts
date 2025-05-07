import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PresupuestoDocument = Presupuesto & Document;

@Schema({ timestamps: true })
export class Presupuesto {

  @Prop({ required: true, default: 0 })
  monto: number;
}

export const PresupuestoSchema = SchemaFactory.createForClass(Presupuesto);