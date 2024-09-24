import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    return this.prisma.appointment.create({ data });
  }

  async findAll() {
    return this.prisma.appointment.findMany();
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id_appointment: id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, data: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id_appointment: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id_appointment: id },
    });
  }

  // Obtener las citas del día ordenadas por hora
  async findTodayAppointments() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        patient: true, 
        doctor: true,  
      },
    });
  }
}