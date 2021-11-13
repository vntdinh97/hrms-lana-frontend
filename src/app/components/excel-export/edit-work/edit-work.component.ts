import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {
  checkIn: Date;
  checkOut: Date;
  types: string[] = [
    'Do inspect',
    'In office to do timesheet, do claim',
    'Office + Traveling to',
    'Compensatory day',
    'Annual leave',
    'Khác ...'
  ]
  selectedType: string = null;
  remark: string;
  isRemarkDisabled: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.checkOut = new Date(this.data.shift.checkOut)
      this.checkIn = new Date(this.data.shift.checkIn)
      this.remark = this.data.shift.remark;
    }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const result = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      remark: this.remark
    }
    this.dialogRef.close(result)
  }

  onChangeType() {
    this.remark = this.selectedType;
    this.isRemarkDisabled = false;
    if (['Compensatory day', 'Annual leave'].includes(this.selectedType)) {
      this.isRemarkDisabled = true;
    } else if (this.selectedType === 'Khác ...') {
      this.remark = ''; 
    }
  }

}
