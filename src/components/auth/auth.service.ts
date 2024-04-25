import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { INVALID_LOGIN } from 'src/constants/exception';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: data.email,
        },
      });
      const isMatchedUser =
        !!user && (await verify(user?.password, data.password));
      if (!isMatchedUser) {
        throw new HttpException(INVALID_LOGIN, INVALID_LOGIN.statusCode);
      }

      return await this.generateAccessToken(user);
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async generateAccessToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const signConfig = {
      expiresIn: '24h',
      secret: process.env.JWT_SECRET,
    };
    const accessToken = await this.jwtService.signAsync(payload, signConfig);

    delete user.password;
    return { user, accessToken };
  }
}
