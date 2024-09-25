import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDoctorDto: CreateDoctorDto) {
    return this.prisma.doctor.create({
      data: createDoctorDto,
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.prisma.doctor.update({
      where: { id_doctor: id },
      data: updateDoctorDto,
    });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({
      where: { id_doctor: id },
    });
  }
}
