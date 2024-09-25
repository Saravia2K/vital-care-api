import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        ...data,
        finished: false,
        date: new Date(data.date),
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
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
    });
  }

  async findAllForGeneral() {
    return this.prisma.appointment.findMany({
      where: {
        reference: null,
      },
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
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id_appointment: id },
      select: {
        id_appointment: true,
        date: true,
        patient: true,
        doctor: true,
        diagnosis: true,
        treatment: true,
        observations: true,
        reference: {
          select: {
            id_reference: true,
            comments: true,
            doctor: {
              select: {
                id_doctor: true,
                names: true,
                last_names: true,
                specialty: {
                  select: {
                    id_speciality: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        finished: true,
      },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const { diagnosis, treatment, observations, reference } =
      updateAppointmentDto;

    // Actualizar la cita
    const updatedAppointment = await this.prisma.appointment.update({
      where: { id_appointment: id },
      data: {
        diagnosis,
        treatment,
        observations,
      },
    });

    // Si hay referencia, agregarla
    if (reference) {
      const { id_doctor, comments } = reference;

      // Asegúrate de que id_doctor esté definido
      if (!id_doctor) {
        throw new Error('id_doctor es necesario para crear una referencia.');
      }

      // Crear la referencia
      const createdReference = await this.prisma.reference.create({
        data: {
          id_doctor: id_doctor, // Usamos el campo id_doctor
          comments: comments || null, // Comentario opcional
        },
      });

      // Actualizar la cita con el id_reference de la referencia creada
      await this.prisma.appointment.update({
        where: { id_appointment: id },
        data: {
          id_reference: createdReference.id_reference,
        },
      });
    }

    return updatedAppointment;
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
    });
  }
}
