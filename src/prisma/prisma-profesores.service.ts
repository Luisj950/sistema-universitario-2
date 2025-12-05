import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// CAMBIO CLAVE: Importamos desde el cliente de profesores
import { PrismaClient } from '@prisma/client-profesores';

@Injectable()
export class PrismaProfesoresService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}