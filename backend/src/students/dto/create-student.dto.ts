import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'Nombre completo del estudiante', example: 'Juan Carlos Pérez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Fecha de nacimiento en formato YYYY-MM-DD', example: '2010-05-15' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ description: 'Nombre completo del padre', example: 'Pedro Pérez' })
  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @ApiProperty({ description: 'Nombre completo de la madre', example: 'Ana Gómez' })
  @IsString()
  @IsNotEmpty()
  motherName: string;

  @ApiProperty({ description: 'Grado numérico al que ingresa', example: 5 })
  @IsInt()
  @IsNotEmpty()
  grade: number;

  @ApiProperty({ description: 'Sección del grado', example: 'A' })
  @IsString()
  @IsNotEmpty()
  section: string;

  @ApiProperty({ description: 'Fecha de ingreso en formato YYYY-MM-DD', example: '2025-01-20' })
  @IsDateString()
  @IsNotEmpty()
  enrollmentDate: string;
}