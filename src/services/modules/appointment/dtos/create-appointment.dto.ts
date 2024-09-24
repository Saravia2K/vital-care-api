import {
    IsInt,
    IsOptional,
    IsDateString,
    IsString,
    IsBoolean,
  } from 'class-validator';
  
  export class CreateAppointmentDto {
    @IsInt()
    id_patient: number;
  
    @IsInt()
    id_doctor: number;
  
    @IsOptional()
    @IsInt()
    id_reference?: number;
  
    @IsDateString()
    date: string;
  
    @IsOptional()
    @IsString()
    diagnosis?: string;
  
    @IsOptional()
    @IsString()
    treatment?: string;
  
    @IsOptional()
    @IsString()
    observations?: string;
  
    @IsBoolean()
    finished: boolean;
  }