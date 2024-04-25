import { HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';

@Injectable()
export class GalleryService {
  constructor(private prismaService: PrismaService) {}

  async create(@UploadedFile() image: Express.Multer.File) {
    try {
      const gallery = await this.prismaService.gallery.create({
        data: { url: image?.path },
      });

      return {
        statusCode: HttpStatus.CREATED,
        gallery,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async findAll() {
    try {
      const galleries = await this.prismaService.gallery.findMany();

      return {
        statusCode: HttpStatus.OK,
        galleries,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  async remove(id: number) {
    try {
      await this.prismaService.gallery.delete({
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
