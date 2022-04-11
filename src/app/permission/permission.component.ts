import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  permissionList: any;

  constructor(
    private route : ActivatedRoute, 
    private router : Router, 
    private api: ApiService) { }

    id:any
    user:any

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllPermissions();
  }

  getAllPermissions() {

      this.api.getUserById(this.id)
      .subscribe({
        next:(res)=>{
          this.user = res;
          this.permissionList = this.user.permissionList;
        },
        error:(err)=>{
          console.error("Error while getting users data");
        }
      })
  }

  updatePermission() {
    console.warn('update permission', this.user);
    this.api.putUser(this.user, this.id)
     .subscribe({
       next:(res)=>{
         console.log("User updated successfully");
         this.permissionList = res.permissionList;
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
