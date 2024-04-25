import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { getFileInterceptor } from 'src/middlewares/multer';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Get()
  async read(@Query() params: any) {
    return await this.branchService.read(params);
  }

  @Get(':id')
  async getById(@Param() params: any) {
    return await this.branchService.getById(params);
  }

  @Post()
  @UseInterceptors(getFileInterceptor('avatar'))
  async create(
    @Body() userData: any,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.branchService.create(userData, avatar);
  }

  @Put(':id')
  @UseInterceptors(getFileInterceptor('avatar'))
  async update(
    @Param() params: any,
    @Body() userData: any,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.branchService.update(params, userData, avatar);
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.branchService.delete(params);
  }
}
