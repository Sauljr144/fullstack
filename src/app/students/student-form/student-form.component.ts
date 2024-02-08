import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  studentFormSubcription!: Subscription;

  constructor(private formBuilder: FormBuilder, private studentServices: StudentsService) {}

  ngOnDestroy(): void {
      this.studentFormSubcription.unsubscribe();
  }

  onSubmit = () => {
    this.studentServices.addStudent(this.form.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
      
    this.form = this.formBuilder.group({
        name:["", Validators.required],
        address:[],
        phoneNumber:[],
        email:["", Validators.required]
    });

  }

}
