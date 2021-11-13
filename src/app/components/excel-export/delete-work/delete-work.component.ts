import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-work',
  templateUrl: './delete-work.component.html',
  styleUrls: ['./delete-work.component.scss']
})
export class DeleteWorkComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteWorkComponent>) { }

  ngOnInit(): void {
  }

  onHandleCancel() {
    this.dialogRef.close(false)
  }

  onHandleConfirm() {
    this.dialogRef.close(true)
  }

}
