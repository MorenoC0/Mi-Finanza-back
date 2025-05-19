import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module'; // Asegúrate de que la ruta sea correcta
import { AuthModule } from './auth/auth.module'; // Asegúrate de que la ruta sea correcta

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CategoriesModule,
    PresupuestoModule,
    AuthModule, // Asegúrate de que la ruta sea correcta
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
