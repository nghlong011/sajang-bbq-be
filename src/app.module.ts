import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './components/auth/auth.module';
import { JwtStategy } from './components/auth/strategy';
import { BlogModule } from './components/blog/blog.module';
import { BookingModule } from './components/booking/booking.module';
import { BranchModule } from './components/branch/branch.module';
import { DishModule } from './components/dish/dish.module';
import { GalleryModule } from './components/gallery/gallery.module';
import { ReviewModule } from './components/review/review.module';
import { ScheduleModule } from './components/schedule/schedule.module';
import { UserModule } from './components/user/user.module';
import { UtilityModule } from './components/utility/utility.module';
import { PrismaModule } from './prisma/prisma.module';
import { RevenueModule } from './components/revenue/revenue.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MulterModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'images'),
      serveRoot: '/images/',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BranchModule,
    BlogModule,
    UtilityModule,
    GalleryModule,
    BookingModule,
    ScheduleModule,
    DishModule,
    ReviewModule,
    RevenueModule,
  ],
  providers: [JwtStategy],
})
export class AppModule {}
