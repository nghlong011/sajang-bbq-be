import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateBranchDto } from './dto/create-dto';

@Injectable()
export class BranchService {
  constructor(private prismaService: PrismaService) {}

  async read(params: any) {
    try {
      const { current = 1, size = 9999 } = params;
      const branch = await this.prismaService.branch.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
        include: {
          utils: {
            include: {
              util: true,
            },
          },
        },
      });
      const count = await this.prismaService.branch.count();

      return {
        statusCode: HttpStatus.OK,
        branch,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async getById(params: any) {
    try {
      const branch = await this.prismaService.branch.findUnique({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        branch,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async create(data: CreateBranchDto, avatar: Express.Multer.File) {
    try {
      const { name, address, phone, table, utils: stringUtils } = data;
      const utils = stringUtils.split(',');
      await this.prismaService.branch.create({
        data: {
          name,
          address,
          phone,
          table: +table,
          avatar: avatar?.path,
          utils: {
            create: utils.map((utilId) => ({
              util: {
                connect: {
                  id: +utilId,
                },
              },
            })),
          },
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

  async update(params: any, data: any, avatar: Express.Multer.File) {
    try {
      const { name, address, phone, table, utils: stringUtils } = data;
      const utils = stringUtils.split(',');
      await this.prismaService.branch.update({
        where: {
          id: Number(params.id),
        },
        data: {
          name,
          address,
          phone,
          table: +table,
          avatar: avatar?.path,
          utils: {
            deleteMany: {
              branchId: Number(params.id),
            },
            create: utils.map((utilId) => ({
              util: {
                connect: {
                  id: +utilId,
                },
              },
            })),
          },
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

  async delete(params: any) {
    try {
      await this.prismaService.utilitiesOnBranches.deleteMany({
        where: {
          branchId: Number(params.id),
        },
      });
      await this.prismaService.branch.delete({
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
