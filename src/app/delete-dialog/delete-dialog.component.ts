import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private api: ApiService,  
    @Inject(MAT_DIALOG_DATA) public userId : any, 
    private dialogRef : MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.api.deleteUser(this.userId)
      .subscribe({
        next: (res) => {
          console.log("User deleted successfully");
          this.dialogRef.close();
        },
        error: (err) => {
          console.error("Error while deleting user");
        }
      })
  }

}
