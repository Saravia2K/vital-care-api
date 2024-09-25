import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // Endpoint para login
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    // Obtener las variables de entorno (contraseñas ya encriptadas)
    const nurseEmail = this.configService.get<string>('EMAIL_ENFERMERA');
    const nurseHashedPassword =
      this.configService.get<string>('PASS_ENFERMERA');
    const generalEmail = this.configService.get<string>('EMAIL_GENERAL');
    const generalHashedPassword =
      this.configService.get<string>('PASS_GENERAL');

    // Comparar con EMAIL_ENFERMERA
    if (email === nurseEmail) {
      const isPasswordValid = await bcrypt.compare(
        password,
        nurseHashedPassword,
      );
      if (isPasswordValid) {
        return { message: 'Login successful for nurse', type: 'nurse' };
      } else {
        throw new BadRequestException('Invalid credentials for nurse');
      }
    }

    // Comparar con EMAIL_GENERAL
    if (email === generalEmail) {
      const isPasswordValid = await bcrypt.compare(
        password,
        generalHashedPassword,
      );
      if (isPasswordValid) {
        return {
          message: 'Login successful for general user',
          type: 'general',
        };
      } else {
        throw new BadRequestException('Invalid credentials for general user');
      }
    }

    // Si no es ninguno de los dos, buscar en la tabla Doctor
    const doctor = await this.prisma.doctor.findUnique({
      where: { email },
    });

    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    // Comparar la contraseña en la tabla de doctores
    const isDoctorPasswordValid = await bcrypt.compare(
      password,
      doctor.password,
    );
    if (!isDoctorPasswordValid) {
      throw new BadRequestException('Invalid password for doctor');
    }

    return {
      message: 'Login successful for doctor',
      type: 'doctor',
      doctorId: doctor.id_doctor,
    };
  }

  // Endpoint para crear doctores
  @Post('doctors')
  async createDoctor(
    @Body('names') names: string,
    @Body('last_names') last_names: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('id_specialty') id_speciality: number,
  ) {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const doctor = await this.prisma.doctor.create({
        data: {
          names,
          last_names,
          email,
          password: hashedPassword,
          id_speciality,
        },
      });
      return { message: 'Doctor created successfully', doctor };
    } catch (_) {
      throw new BadRequestException('Error creating doctor');
    }
  }
}
