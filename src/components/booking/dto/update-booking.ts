import { IsNotEmpty } from 'class-validator';
import { ENUM_BOOKING_STATUS } from 'src/constants/app';

export class UpdateBookingDto {
  @IsNotEmpty()
  status: ENUM_BOOKING_STATUS;
}
