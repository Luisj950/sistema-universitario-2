import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// 1. IMPORTAMOS EL SERVICIO ESPECÍFICO
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    // 2. INYECCIÓN CORRECTA: Usamos PrismaUsuariosService, NO PrismaService
    private prisma: PrismaUsuariosService, 
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, nombre } = registerDto;
    
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nombre,
        roles: ["user"] // Array simple de strings
      },
    });
  }
}