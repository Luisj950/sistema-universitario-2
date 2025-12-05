import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// CAMBIO CLAVE: Importamos desde la carpeta específica que creamos
import { PrismaClient } from '@prisma/client-usuarios';

@Injectable()
export class PrismaUsuariosService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}