import { Module, Global } from '@nestjs/common';
import { PrismaUsuariosService } from './prisma-usuarios.service';
import { PrismaCarrerasService } from './prisma-carreras.service';
import { PrismaProfesoresService } from './prisma-profesores.service';

@Global()
@Module({
  providers: [
    PrismaUsuariosService, 
    PrismaCarrerasService, 
    PrismaProfesoresService
  ],
  exports: [
    PrismaUsuariosService, 
    PrismaCarrerasService, 
    PrismaProfesoresService
  ],
})
export class PrismaModule {}