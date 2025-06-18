import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  student: any = {
    name: '',
    birthDate: '',
    fatherName: '',
    motherName: '',
    grade: 1,
    section: 'A',
    enrollmentDate: ''
  };

  isEditMode = false;
  private studentId: number | null = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.studentId = +idParam;
      this.studentService.getStudentById(this.studentId).subscribe(data => {
        if (data.birthDate) {
          data.birthDate = data.birthDate.split('T')[0];
        }
        if (data.enrollmentDate) {
          data.enrollmentDate = data.enrollmentDate.split('T')[0];
        }
        this.student = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.studentId) {
      
      const studentDataToUpdate = { ...this.student };
      delete studentDataToUpdate.id;

      this.studentService.updateStudent(this.studentId, studentDataToUpdate).subscribe({
        next: () => {
          alert('¡Estudiante actualizado con éxito!');
          this.router.navigate(['/students']);
        },
        error: (err) => alert('Error al actualizar: ' + err.message)
      });
    } else {
      this.studentService.createStudent(this.student).subscribe({
        next: () => {
          alert('¡Estudiante registrado con éxito!');
          this.router.navigate(['/students']);
        },
        error: (err) => alert('Error al registrar: ' + err.message)
      });
    }
  }
}