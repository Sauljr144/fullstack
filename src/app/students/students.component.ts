import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Student } from '../types/students';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  constructor(private studentsService: StudentsService) {}

  students$! : Observable<Student[]>;

  ngOnInit(): void {

    this.students$ = this.studentsService.getStudents();
    console.log(this.students$.forEach(student => console.log(student)));
    
    // this.studentsService.getStudents().subscribe({
    //   next: (response) => {

    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

}