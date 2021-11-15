import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HOLIDAY } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';

@Component({
  selector: 'app-holiday-config',
  templateUrl: './holiday-config.component.html',
  styleUrls: ['./holiday-config.component.scss']
})
export class HolidayConfigComponent extends ComponentBase implements OnInit {

  displayedColumns: string[] = ['ordinal', 'day', 'isAnnual', 'action']
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  constructor(public http: HttpClient, public snackBar: MatSnackBar, public dialog: MatDialog) {
    super(http, snackBar);
  }

  ngOnInit(): void {
    this.getHoliday();
  }

  getHoliday() {
    this.http.get<any[]>(HOLIDAY).subscribe(res => {
      if (res) {
        
        this.dataSource.data = res;
      } else {
        this.snackBar.open("Không thể lấy danh sách các ngày nghỉ lễ!");
      }
    })
  }

  add() {
    this.dialog.open(AddHolidayComponent, {data: {action: 'add'}}).afterClosed().subscribe(() => {
      this.getHoliday();
    })
  }

  onHandleEdit(holiday: any) {
    this.dialog.open(AddHolidayComponent, {data: {action: 'edit', holiday}}).afterClosed().subscribe(() => {
      this.getHoliday();
    })
  }

  onHandleDelete(holiday: any) {
    this.http.delete(`${HOLIDAY}/${holiday.dayId}`).subscribe(res => {
      if (res) {
        this.snackBar.open("Xoá thành công");
      } else {
        this.snackBar.open("Xoá không thành công")
      }
      this.getHoliday();
    })
  }

}
