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
import { CreateUserDto } from './dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async read(@Query() params: ReadUserDto) {
    return await this.userService.read(params);
  }

  @Post()
  @UseInterceptors(getFileInterceptor('avatar'))
  async create(
    @Body() userData: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.userService.create(userData, avatar);
  }

  @Put(':id')
  @UseInterceptors(getFileInterceptor('avatar'))
  async update(
    @Param() params: any,
    @Body() userData: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.userService.update(params, userData, avatar);
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.userService.delete(params);
  }
}
