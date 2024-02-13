import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Student } from '../types/students';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  constructor(private studentsService: StudentsService, private toasterService: ToastrService) {}

  students$! : Observable<Student[]>;

  ngOnInit(): void {

    this.getStudents();
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

  private getStudents(): void {
    this.students$= this.studentsService.getStudents();
  }

  delete(id:number) {
    this.studentsService.deleteStudent(id).subscribe({
      next: (response) => {
        this.toasterService.success("Student deleted successfully");
        this.getStudents();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
