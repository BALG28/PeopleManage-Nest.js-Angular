import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/security/basic-auth/basic-auth.guard';

@ApiBasicAuth()
@ApiTags('students')
@Controller() 
@UseGuards(BasicAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('crear-alumno') 
  @ApiOperation({ summary: 'Registrar un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante creado exitosamente.' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('consultar-alumno/:grade') 
  @ApiOperation({ summary: 'Obtener estudiantes por grado' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes filtrada.'})
  findByGrade(@Param('grade') grade: number) {
    return this.studentsService.findByGrade(grade);
  }

  @Get('students')
  @ApiOperation({ summary: 'Obtener la lista de todos los estudiantes' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('students/:id')
  @ApiOperation({ summary: 'Obtener un estudiante por su ID' })
  findOne(@Param('id') id: number) {
    return this.studentsService.findOne(id);
  }

  @Patch('students/:id')
  @ApiOperation({ summary: 'Actualizar un estudiante existente' })
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete('students/:id')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  remove(@Param('id') id: number) {
    return this.studentsService.remove(id);
  }
}