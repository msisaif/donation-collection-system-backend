import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
