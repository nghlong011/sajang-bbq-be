import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class RevenueService {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: any) {
    try {
      const { date } = params;
      const revenues = await this.prismaService.revenue.findMany({
        where: { date },
      });
      const count = await this.prismaService.revenue.count();

      return {
        statusCode: HttpStatus.OK,
        revenues,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
