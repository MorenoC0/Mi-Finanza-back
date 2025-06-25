// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { Transaction, TransactionSchema } from './transaction.schema';
import { Category } from 'src/categories/category.schema';
import { CategorySchema } from 'src/categories/category.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
        collection: 'categories', // Asegúrate de que la colección se llame '
      },
    ]),
    JwtModule.register({}), // <-- esto lo hace accesible
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionModule {}
