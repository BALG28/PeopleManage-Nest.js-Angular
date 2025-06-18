import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000'; 
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const username = 'admin';
    const password = 'ApiSecret123';
    const basicAuthString = 'Basic ' + btoa(username + ':' + password);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basicAuthString
    });
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/students`, { headers: this.headers });
  }

  //Ruta consultar alumno 
  getStudentsByGrade(grade: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consultar-alumno/${grade}`, { headers: this.headers });
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/students/${id}`, { headers: this.headers });
  }

  // Ruta crear alumno 
  createStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear-alumno`, student, { headers: this.headers });
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/students/${id}`, student, { headers: this.headers });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/students/${id}`, { headers: this.headers });
  }
}