import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class UtilityService {
  constructor(private prismaService: PrismaService) {}

  async read() {
    try {
      const utils = await this.prismaService.utility.findMany();

      return {
        statusCode: HttpStatus.OK,
        utils,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
