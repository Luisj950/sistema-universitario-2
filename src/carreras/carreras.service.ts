import { Injectable } from '@nestjs/common';
// Importamos el servicio específico de la BD de Carreras
import { PrismaCarrerasService } from '../prisma/prisma-carreras.service';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaCarrerasService) {}

  create(data: any) {
    // Tu modelo se llama "Carrera" y el campo es "nombre"
    return this.prisma.carrera.create({
      data: {
        nombre: data.nombre, 
      },
    });
  }

  findAll() {
    return this.prisma.carrera.findMany();
  }
}