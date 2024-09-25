import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('general')
  findAllForGeneral() {
    return this.appointmentService.findAllForGeneral();
  }

  @Get('today')
  findTodayAppointments() {
    return this.appointmentService.findTodayAppointments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(Number(id));
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(Number(id), updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(Number(id));
  }

  @Get('referred/:id_doctor')
  findAppointmentsByReferredDoctor(@Param('id_doctor') id_doctor: string) {
    return this.appointmentService.findAppointmentsByReferredDoctor(
      Number(id_doctor),
    );
  }
}
