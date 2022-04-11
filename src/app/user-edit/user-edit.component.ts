import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) 
    public editData : any, 
    private route : ActivatedRoute, 
    private router : Router) { }

  data: any
  id: any

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.userForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required],
      email : ['', Validators.required],
      status : ['', Validators.required],
    })

    this.data = this.api.getUserById(this.id).subscribe((result=>{
      this.userForm.controls['firstName'].setValue(result.firstName);
      this.userForm.controls['lastName'].setValue(result.lastName);
      this.userForm.controls['username'].setValue(result.username);
      this.userForm.controls['password'].setValue(result.password);
      this.userForm.controls['email'].setValue(result.email);
      this.userForm.controls['status'].setValue(result.status);
    }));

  }

  updateUser() {
    this.api.putUser(this.userForm.value, this.id)
     .subscribe({
       next:(res)=>{
         console.log("User updated successfully");
         this.userForm.reset();
         this.navigateHome();
  },
       error:(err)=>{
         console.error("Error while updating user");
       }
     })
   }

  navigateHome() {
    this.router.navigate(['']);
  }

}
