import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { getFileInterceptor } from 'src/middlewares/multer';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(getFileInterceptor('avatar'))
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.blogService.create(createBlogDto, avatar);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.blogService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(getFileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.blogService.update(+id, updateBlogDto, avatar);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
