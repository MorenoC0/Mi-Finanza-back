import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Presupuesto, PresupuestoDocument } from './presupuesto.schema';
import { Transaction } from '../transactions/transaction.schema';

@Injectable()
export class PresupuestoService {
  constructor(
    @InjectModel(Presupuesto.name)
    private readonly presupuestoModel: Model<PresupuestoDocument>,

    //@InjectModel(Transaction.name)
    //private readonly transactionModel: Model<Transaction>,
  ) {}

  async crear( montoInicial: number): Promise<Presupuesto> {
    const nuevo = new this.presupuestoModel({ monto: montoInicial });
    return nuevo.save();
  }

  async obtenerTodos(): Promise<Presupuesto[]> {
    return this.presupuestoModel.find().exec();
  }

  async obtenerPorId(id: string): Promise<Presupuesto> {
    const presupuesto = await this.presupuestoModel.findById(id);
    if (!presupuesto) throw new NotFoundException('Presupuesto no encontrado');
    return presupuesto;
  }

  async actualizarMonto(id: string, cantidad: number): Promise<Presupuesto> {
    const presupuesto = await this.presupuestoModel.findById(id);
    if (!presupuesto) throw new NotFoundException('Presupuesto no encontrado');

    presupuesto.monto += cantidad;
    return presupuesto.save();
  }
}
