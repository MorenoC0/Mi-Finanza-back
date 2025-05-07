import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';

@Controller('presupuesto')
export class PresupuestoController {
  constructor(private readonly presupuestoService: PresupuestoService) {}

  @Post()
  crear(@Body() body: { monto: number }) {
    return this.presupuestoService.crear( body.monto);
  }

  @Get()
  obtenerTodos() {
    return this.presupuestoService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.presupuestoService.obtenerPorId(id);
  }

  @Patch(':id/ajustar')
  ajustarMonto(@Param('id') id: string, @Body() body: { cantidad: number }) {
    return this.presupuestoService.actualizarMonto(id, body.cantidad);
  }
}
