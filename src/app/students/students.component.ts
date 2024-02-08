import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Student } from '../types/students';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
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
