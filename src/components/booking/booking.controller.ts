import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { UpdateBookingDto } from './dto/update-booking';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async read(@Query() params: any) {
    return await this.bookingService.read(params);
  }

  @Get(':id')
  async getById(@Param() params: any) {
    return await this.bookingService.getById(params);
  }

  @Post()
  async create(@Body() data: any) {
    return await this.bookingService.create(data);
  }

  @Put(':id')
  async update(@Param() params: any, @Body() data: UpdateBookingDto) {
    return await this.bookingService.update(params, data);
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.bookingService.delete(params);
  }
}
