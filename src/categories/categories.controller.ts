// src/categories/categories.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Category[]> {
    return this.categoriesService.findAllByUser(userId);
  }
}
