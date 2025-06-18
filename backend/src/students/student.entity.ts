import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  grade: number;

  @Column()
  section: string;

  @Column({ type: 'date' })
  enrollmentDate: Date;
}