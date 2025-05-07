import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoController } from './presupuesto.controller';
import { Presupuesto, PresupuestoSchema } from './presupuesto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Presupuesto.name, schema: PresupuestoSchema }])],
  controllers: [PresupuestoController],
  providers: [PresupuestoService],
  exports: [PresupuestoService],
})
export class PresupuestoModule {}
