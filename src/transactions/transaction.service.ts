// src/transactions/transactions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { Category } from '../categories/category.schema';
import { identity } from 'rxjs';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    // Validar que la categoría exista
    const category = await this.categoryModel.findById(transaction.categoryId);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    //await this.presupuestoService.actualizarMonto(transaction.id: string, cantidad: number);

    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }
}
