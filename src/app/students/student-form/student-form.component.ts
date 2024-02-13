import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  isEdit = false;
  paramsSubscription!: Subscription;
  id=0;

  constructor(private formBuilder: FormBuilder, private studentServices: StudentsService, private activatedRouter: ActivatedRoute, private router: Router, private toasterService: ToastrService) {}

  ngOnDestroy(): void {

    if(this.studentFormSubcription){
      this.studentFormSubcription.unsubscribe();
    }
    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }

  onSubmit = () => {

    if(!this.isEdit){

      this.paramsSubscription = this.studentServices.addStudent(this.form.value).subscribe({
         next: (response) => {
           console.log(response);
           this.toasterService.success("Student added successfully");
           this.router.navigate(["/students"]);
         },
         error: (error) => {
           console.log(error);
         }
       })
    }

    else{
      this.studentServices.editStudent(this.id, this.form.value).subscribe({
        next: (value) => {
          console.log(value);
          this.toasterService.success("Student updated successfully");
          this.router.navigateByUrl('/students');
        },
        error: (error) => {
          console.log(error);
          this.toasterService.error("Error updating student");
        }
      })
    }

    
  }

  ngOnInit(): void {

    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next:(response) =>{
        console.log(response['id']);
        let id = response['id'];
        this.id = id;
        if(!id)return;
        this.studentServices.getStudent(id).subscribe({
          next:(response)=>{
            console.log(response);
            this.form.patchValue(response);
            this.isEdit = true;
          }
        })
      },
      error:(error) => {
        console.log(error);
      }
    })
      
    this.form = this.formBuilder.group({
        name:["", Validators.required],
        address:[],
        phoneNumber:[],
        email:["", Validators.email]
    });

  }

}
