import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class ScheduleService {
  constructor(private prismaService: PrismaService) {}

  async read() {
    try {
      const schedules = await this.prismaService.schedule.findMany();

      return {
        statusCode: HttpStatus.OK,
        schedules,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
