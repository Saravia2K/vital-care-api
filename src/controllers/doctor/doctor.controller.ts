import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from 'src/services/doctor/doctor.service';
import { CreateDoctorDto } from 'src/services/doctor/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/services/doctor/dto/update-doctor.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  async findAll() {
    // Excluyendo la contraseña
    return this.prismaService.doctor.findMany({
      select: {
        id_doctor: true,
        names: true,
        last_names: true,
        email: true,
        specialty: true,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Excluyendo la contraseña al buscar un doctor por ID
    return this.prismaService.doctor.findUnique({
      where: { id_doctor: Number(id) },
      select: {
        id_doctor: true,
        names: true,
        last_names: true,
        email: true,
        specialty: true,
        appointments: {
          select: {
            id_appointment: true,
            date: true,
            patient: true,
            doctor: true,
            diagnosis: true,
            treatment: true,
            observations: true,
            reference: true,
            finished: true,
          },
        },
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(Number(id), updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(Number(id));
  }
}
