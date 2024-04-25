import { IsNotEmpty } from 'class-validator';

export class ReadUserDto {
  @IsNotEmpty()
  current: number;

  @IsNotEmpty()
  size: number;
}
