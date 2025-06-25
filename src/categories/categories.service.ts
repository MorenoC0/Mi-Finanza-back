// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    console.log('Creating category:', newCategory);
    return newCategory.save();
  }

  async findAllByUser(userId: string): Promise<Category[]> {
    return this.categoryModel.find({ userId }).exec();
  }
}
