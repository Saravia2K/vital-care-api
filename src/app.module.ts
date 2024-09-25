import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { PatientService } from './services/modules/patient/patient.service';
import { PatientController } from './services/modules/patient/patient.controller';
import { AppointmentService } from './services/modules/appointment/appointment.service';
import { AppointmentController } from './services/modules/appointment/appointment.controller';
import { SpecialitiesController } from './controllers/specialities-controller/specialities-controller.controller';
import { AuthController } from './controllers/auth-controller/auth-controller.controller';
import { ConfigService } from '@nestjs/config';
import { DoctorController } from './controllers/doctor/doctor.controller';
import { DoctorService } from './services/doctor/doctor.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PatientController,
    AppointmentController,
    SpecialitiesController,
    AuthController,
    DoctorController,
  ],
  providers: [
    AppService,
    PrismaService,
    PatientService,
    AppointmentService,
    ConfigService,
    Logger,
    DoctorService,
  ],
})
export class AppModule {}
