import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule
  ],
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  selectedGrade: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data;
    });
  }

  filterByGrade(): void {
    console.log('--- INICIA EL FILTRO ---');
    console.log('1. Se llamó a filterByGrade(). El valor de this.selectedGrade en este momento es:', this.selectedGrade);

    if (this.selectedGrade) {
      console.log('2. La condición IF es verdadera. Se llamará a la API para buscar el grado:', this.selectedGrade);
      this.studentService.getStudentsByGrade(this.selectedGrade).subscribe({
        next: (data) => {
          console.log('3. La API respondió con los siguientes datos:', data);
          this.filteredStudents = data;
          console.log('4. La lista "filteredStudents" ha sido actualizada. La tabla debería cambiar ahora.');
        },
        error: (err) => {
          console.error('¡ERROR! La llamada a la API falló:', err);
        }
      });
    } else {
      console.log('2. La condición IF es falsa (el valor es nulo). Se resetea la lista.');
      this.filteredStudents = this.students;
      console.log('3. La lista "filteredStudents" ha sido reseteada a la lista completa.');
    }
  }

  onEdit(id: number): void {
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar a este estudiante?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Estudiante eliminado con éxito.');
          this.loadStudents(); 
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Hubo un error al eliminar al estudiante.');
        }
      });
    }
  }
}