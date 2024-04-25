import { Controller, Get } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private ultilService: UtilityService) {}

  @Get()
  async read() {
    return await this.ultilService.read();
  }
}
