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
  
    @Get('today')
    findTodayAppointments() {
      return this.appointmentService.findTodayAppointments();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.appointmentService.findOne(Number(id));
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
      return this.appointmentService.update(Number(id), updateAppointmentDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.appointmentService.remove(Number(id));
    }
  }