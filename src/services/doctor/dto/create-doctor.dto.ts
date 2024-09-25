import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  last_names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  id_speciality: number;
}
