import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { JwtService } from '@nestjs/jwt';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() body: any,
    @Headers('authorization') authHeader: string,
  ) {
    console.log('authHeader:', authHeader);

    // Extraer token del header
    const token = authHeader?.replace('Bearer ', '');

    // Decodificar el token para extraer el userId
    const decoded = this.jwtService.decode(token) as { sub: string };

    const userId = decoded?.sub;
    if (!userId) {
      throw new Error('No se pudo obtener el userId');
    }
    console.log('authHeader:', authHeader);

    return await this.transactionsService.create({
      ...body,
      date: body.date ? new Date(body.date) : new Date(),
      userId,
    });
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string) {
    console.log('authHeader:', authHeader);

    // Extraer token del header
    const token = authHeader?.replace('Bearer ', '');

    // Decodificar el token para extraer el userId
    const decoded = this.jwtService.decode(token) as { sub: string };

    const userId = decoded?.sub;
    if (!userId) {
      throw new Error('No se pudo obtener el userId');
    }

    return await this.transactionsService.findAllByUser(userId);
  }
}
