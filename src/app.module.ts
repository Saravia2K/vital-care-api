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

@Module({
  imports: [],
  controllers: [
    AppController,
    PatientController,
    AppointmentController,
    SpecialitiesController,
    AuthController,
  ],
  providers: [
    AppService,
    PrismaService,
    PatientService,
    AppointmentService,
    ConfigService,
    Logger,
  ],
})
export class AppModule {}
