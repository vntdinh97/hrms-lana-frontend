import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HOLIDAY } from 'src/app/utils/api_url';
import { ComponentBase } from '../../component-base';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent extends ComponentBase implements OnInit {

  dateList: number[] = Array.from({length: 31}, (_, index) => index + 1);
  monthList: number[] = Array.from({length: 12}, (_, index) => index + 1);
  yearList: number[] = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1];
  type: string = 'once';

  holiday: {date: number, month: number, year?: number} = {
    date: new Date().getDate(), month: new Date().getMonth()+1, year: new Date().getFullYear() 
  };

  action: string = 'add';
  constructor(public dialogRef: MatDialogRef<AddHolidayComponent>,
    public http: HttpClient,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      super(http, snackBar);
    }

  ngOnInit(): void {
    if (this.data.action == 'edit') {
      this.action = this.data.action;
      this.holiday = {...this.data.holiday}
    }
  }

  onHandleAction() {
    if (this.action == 'add') {
      this.http.post(HOLIDAY, this.holiday).subscribe(res => {
        if (res) {
          this.dialogRef.close(true)
        } else {
          this.snackBar.open("Không thể thêm mới ngày nghỉ lễ");
        }
      })
    } else {
      this.http.put(`${HOLIDAY}/${this.data.holiday.dayId}`, this.holiday).subscribe(res => {
        if (res) {
          this.dialogRef.close(true)
        } else {
          this.snackBar.open("Không thể chỉnh sửa ngày nghỉ lễ");
        }
      })
    }
  }

  onChangeType() {
    if (this.type == 'once') {
      this.holiday.year = new Date().getFullYear();
    } else {
      this.holiday.year = null;
    }
  }

  onHandleCancel() {
    this.dialogRef.close(false);
  }

}
