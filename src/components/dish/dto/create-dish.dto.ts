import { IsNotEmpty } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  name: string;
}
