import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { PatientService } from './patient.service';
  import { CreatePatientDto } from './dtos/create-patient.dto';
  import { UpdatePatientDto } from './dtos/update-patient.dto';
  
  @Controller('patients')
  export class PatientController {
    constructor(private readonly patientService: PatientService) {}
  
    @Post()
    create(@Body() createPatientDto: CreatePatientDto) {
      return this.patientService.create(createPatientDto);
    }
  
    @Get()
    findAll() {
      return this.patientService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.patientService.findOne(Number(id));
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updatePatientDto: UpdatePatientDto,
    ) {
      return this.patientService.update(Number(id), updatePatientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.patientService.remove(Number(id));
    }
  }