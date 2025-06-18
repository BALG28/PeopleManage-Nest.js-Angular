import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepository.create(createStudentDto);
    try {
      return await this.studentsRepository.save(student);
    } catch (error) {
      console.error('--- ERROR DE BASE DE DATOS ---', error);
      throw new InternalServerErrorException('Error al guardar el registro. Revisa la consola del servidor.');
    }
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  async findByGrade(grade: number): Promise<Student[]> {
    return this.studentsRepository.find({ where: { grade } });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.studentsRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentsRepository.delete(id);
  }
}