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
  premissions: any;

  constructor(
    private route : ActivatedRoute, 
    private router : Router, 
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllPermissions();
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  getAllPermissions() {
    this.api.getPermission()
    .subscribe({
      next:(res)=>{
        console.warn('getAllPermissions', res);
      },
      error:(err)=>{
        console.error("Error while getting users data");
      }
    })
  }

}
