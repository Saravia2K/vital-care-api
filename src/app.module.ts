import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { PatientService } from './services/modules/patient/patient.service';
import { PatientController } from './services/modules/patient/patient.controller';
import { AppointmentService } from './services/modules/appointment/appointment.service';
import { AppointmentController } from './services/modules/appointment/appointment.controller';

@Module({
  imports: [],
  controllers: [AppController, PatientController, AppointmentController],
  providers: [AppService, PrismaService, PatientService, AppointmentService],
})

export class AppModule {}
