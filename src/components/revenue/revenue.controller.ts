import { Controller, Get, Query } from '@nestjs/common';
import { RevenueService } from './revenue.service';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  findAll(@Query() params: any) {
    return this.revenueService.findAll(params);
  }
}
