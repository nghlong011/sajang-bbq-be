import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class DishService {
  constructor(private prismaService: PrismaService) {}
  async create(createDishDto: CreateDishDto) {
    try {
      const { name, role, price } = createDishDto;
      await this.prismaService.dish.create({
        data: {
          name,
          role,
          price,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async findAll(params: any) {
    try {
      const { current = 1, size = 9999 } = params;
      const dishes = await this.prismaService.dish.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
        include: {
          bookings: true,
        },
      });
      const count = await this.prismaService.dish.count();

      return {
        statusCode: HttpStatus.OK,
        dishes,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    try {
      const { name, role, price } = updateDishDto;
      await this.prismaService.dish.update({
        where: {
          id,
        },
        data: {
          name,
          role,
          price,
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

  async remove(id: number) {
    try {
      await this.prismaService.dish.delete({
        where: {
          id,
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
