import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { PatientService } from './services/modules/patient/patient.service';
import { PatientController } from './services/modules/patient/patient.controller';


@Module({
  imports: [],
  controllers: [AppController, PatientController],
  providers: [AppService, PrismaService, PatientService],
})

export class AppModule {}
