import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importante importar PrismaModule
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}