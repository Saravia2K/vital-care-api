import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private prismaService: PrismaService) {}

  @Get('/')
  async getAll() {
    try {
      const specialties = await this.prismaService.specialty.findMany();
      return specialties;
    } catch (error) {
      console.error('Error fetching specialties:', error);
      throw new Error('Could not fetch specialties');
    }
  }
}
