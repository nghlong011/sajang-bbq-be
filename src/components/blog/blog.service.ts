import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class BlogService {
  constructor(private prismaService: PrismaService) {}
  async create(createBlogDto: CreateBlogDto, avatar: Express.Multer.File) {
    try {
      const { title, content } = createBlogDto;
      await this.prismaService.blog.create({
        data: {
          title,
          content,
          imageUrl: avatar?.path,
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

  async findAll(params: any) {
    try {
      const { current, size } = params;
      const blogs = await this.prismaService.blog.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
      });
      const count = await this.prismaService.blog.count();

      return {
        statusCode: HttpStatus.OK,
        blogs,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    avatar: Express.Multer.File,
  ) {
    try {
      const { title, content } = updateBlogDto;
      await this.prismaService.blog.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          imageUrl: avatar?.path,
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

  async remove(id: number) {
    try {
      await this.prismaService.blog.delete({
        where: {
          id,
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
