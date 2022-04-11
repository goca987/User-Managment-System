import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  userForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private router : Router,
    private dialogRef : MatDialogRef<CreateDialogComponent>) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required],
      email : ['', Validators.email],
      status : ['', Validators.required],
    })

    if(this.editData) {
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['status'].setValue(this.editData.status);
    }

  }

  createUser() {
    if(!this.editData) {
      if(this.userForm.valid) {
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            console.log("User created successfully");
            this.userForm.reset();
            this.dialogRef.close();
            if(this.router.url != '/') {
              this.router.navigate(['']);
            } else {
              window.location.reload();
            }

          },
          error:()=>{
            console.error("Error while creating user")
          }
        })
      }
    } else {
      console.error('editData not found');
    }
  }

}
