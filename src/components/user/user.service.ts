import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateUserDto } from './dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async read(params: ReadUserDto) {
    try {
      const { current, size } = params;
      const user = await this.prismaService.user.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
      });
      const count = await this.prismaService.user.count();

      return {
        statusCode: HttpStatus.OK,
        user,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async create(data: CreateUserDto, avatar: Express.Multer.File) {
    try {
      const { email, password, firstName, lastName, phone, role } = data;
      const hashedPassword = await hash(password);
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          avatar: avatar?.path,
          role,
        },
      });

      delete user.password;
      return {
        statusCode: HttpStatus.CREATED,
        user,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async update(params: any, data: CreateUserDto, avatar: Express.Multer.File) {
    try {
      const { firstName, lastName, phone, role } = data;
      const user = await this.prismaService.user.update({
        where: {
          id: Number(params.id),
        },
        data: {
          firstName,
          lastName,
          phone,
          avatar: avatar?.path,
          role,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        user,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async delete(params: any) {
    try {
      await this.prismaService.user.delete({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
