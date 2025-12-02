import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // 🛡️ CORRECCIÓN DE SEGURIDAD AQUÍ:
    // Verificamos que 'user' exista Y que tenga 'password'.
    // Si la contraseña en la BD es null, retornamos null inmediatamente
    // para evitar que bcrypt.compare explote.
    if (!user || !user.password) {
      return null;
    }

    // Ahora es seguro comparar
    if (await bcrypt.compare(pass, user.password)) {
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

  async register(body: any) {
    const { nombre, email, password: plainPassword } = body;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await this.prisma.user.create({
      data: { 
        nombre, 
        email, 
        password: hashedPassword,
        roles: ['user'] // Aseguramos que tenga un rol por defecto
      },
    });

    const { password, ...result } = newUser;
    return result;
  }
}