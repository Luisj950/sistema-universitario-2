import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarrerasService } from './carreras.service';

@Controller('carreras') // La ruta será /carreras (en plural)
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  create(@Body() body: { nombre: string }) {
    return this.carrerasService.create(body);
  }

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }
}