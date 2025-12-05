import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// CAMBIO CLAVE: Importamos desde el cliente de carreras
import { PrismaClient } from '@prisma/client-carreras';

@Injectable()
export class PrismaCarrerasService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}