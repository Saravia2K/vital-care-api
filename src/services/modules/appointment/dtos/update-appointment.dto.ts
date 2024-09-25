import { IsOptional, IsString, IsObject, IsInt } from 'class-validator';

class ReferenceDto {
  @IsInt()
  id_doctor: number; // Referencia al doctor que recibe la referencia

  @IsString()
  @IsOptional()
  comments: string; // Comentarios opcionales sobre la referencia
}

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  diagnosis: string;

  @IsString()
  @IsOptional()
  treatment: string;

  @IsString()
  @IsOptional()
  observations: string;

  @IsOptional()
  @IsObject()
  reference?: ReferenceDto;
}
