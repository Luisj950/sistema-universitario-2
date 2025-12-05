// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL') ?? process.env.DATABASE_URL_USUARIOS ?? process.env.DATABASE_URL_CARRERAS ?? process.env.DATABASE_URL_PROFESORES;
    if (url) {
      super({
        datasources: {
          db: { url },
        },
      });
    } else {
      // No DB URL available; initialize PrismaClient with defaults and try to connect later
      super();
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      // Evita que la app falle si la BD no está disponible en desarrollo.
      // En producción deberías hacer que la app falle o manejar la reconexión.
      // Logueamos el error para que el desarrollador lo vea.
      // eslint-disable-next-line no-console
      console.warn('Prisma warning: could not connect to the database:', e?.message ?? e);
    }
  }
}