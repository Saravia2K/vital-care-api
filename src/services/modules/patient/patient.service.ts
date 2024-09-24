import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}


  async create(data: CreatePatientDto) {
    return this.prisma.patient.create({ data });
  }


  async findAll() {
    return this.prisma.patient.findMany();
  }

 
  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id_patient: id },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }


  async update(id: number, data: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id_patient: id },
      data,
    });
  }


  async remove(id: number) {
    return this.prisma.patient.delete({
      where: { id_patient: id },
    });
  }
}