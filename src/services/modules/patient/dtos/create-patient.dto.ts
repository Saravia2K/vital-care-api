import { IsString, IsEmail, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Sex } from '@prisma/client';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @IsString()
    second_name: string;
  
    @IsString()
    @IsNotEmpty()
    first_last_name: string;
  
    @IsString()
    @IsNotEmpty()
    second_last_name: string;
  
    @IsEnum(Sex)
    sex: Sex;
  
    @Type(() => Date)
    @IsDate()
    birthdate: Date;
  
    @IsString()
    address: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    cellphone: string;
  
    @IsString()
    blood_type: string;
  }