import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ENUM_BOOKING_STATUS } from 'src/constants/app';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { UpdateBookingDto } from './dto/update-booking';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async read(params: any) {
    try {
      const { current, size, customerId } = params;
      const booking = await this.prismaService.booking.findMany({
        where: {
          NOT: {
            status: ENUM_BOOKING_STATUS.notDeposit,
          },
          customerId: customerId ? +customerId : undefined,
        },
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
        include: {
          branch: true,
          customer: true,
          dishes: {
            include: {
              dish: true,
            },
          },
          schedule: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      const count = await this.prismaService.booking.count({
        where: {
          NOT: {
            status: ENUM_BOOKING_STATUS.notDeposit,
          },
          customerId: customerId ? +customerId : undefined,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        booking,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async getById(params: any) {
    try {
      const booking = await this.prismaService.booking.findUnique({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        booking,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async create(data: any) {
    try {
      const { customerId, branchId, table, date, scheduleId, dishes } = data;
      const isValidTable = await this.isValidTable(data);

      if (!isValidTable) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Đã hết bàn ở khung giờ này, vui lòng chọn thời gian khác',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const booking = await this.prismaService.booking.create({
        data: {
          status: ENUM_BOOKING_STATUS.notDeposit,
          customerId: +customerId,
          branchId: +branchId,
          table: +table,
          date,
          scheduleId: +scheduleId,
          dishes: {
            create: dishes.map((dishId) => ({
              dish: {
                connect: {
                  id: +dishId,
                },
              },
            })),
          },
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success',
        booking,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async isValidTable(data: any) {
    const existedBranch = await this.prismaService.branch.findUnique({
      where: {
        id: data.branchId,
      },
      select: {
        table: true,
      },
    });

    const existedBooking = await this.prismaService.booking.findMany({
      where: {
        NOT: {
          status: ENUM_BOOKING_STATUS.notDeposit,
        },
        branchId: +data.branchId,
        scheduleId: +data.scheduleId,
        date: data.date,
      },
      select: {
        table: true,
      },
    });

    const totalExistedBookingTable = existedBooking.reduce(
      (acc, cur) => acc + cur.table,
      0,
    );

    return totalExistedBookingTable + Number(data.table) <= existedBranch.table;
  }

  async update(params: any, data: UpdateBookingDto) {
    try {
      const { status } = data;
      await this.prismaService.booking.update({
        where: {
          id: Number(params.id),
        },
        data: { status },
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
      await this.prismaService.dishesOnBookings.deleteMany({
        where: {
          bookingId: Number(params.id),
        },
      });
      await this.prismaService.booking.delete({
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
