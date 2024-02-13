import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = 'http://localhost:5190/api/students';

  constructor(private http: HttpClient) { }

  getStudents = () : Observable<Student[]> => this.http.get<Student[]>(this.apiUrl);
  addStudent = (data: Student) => this.http.post(this.apiUrl, data);
  getStudent = (id: number): Observable<Student> => this.http.get<Student>(`${this.apiUrl}/${id}`);
  deleteStudent = (id: number): Observable<Student> => this.http.delete<Student>(`${this.apiUrl}/${id}`);
  editStudent = (id: number, data: Student) => this.http.put(`${this.apiUrl}/${id}`, data);
}
