import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EMP } from 'src/app/models/employee';
import { WORK } from 'src/app/models/work';
import { EMPLOYEE_API, WORK_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { DeleteWorkComponent } from './delete-work/delete-work.component';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.scss'],
})
export class ExcelExportComponent extends ComponentBase implements OnInit {
  selectedEmp: number;
  displayedColumns: string[] = ['checkin', 'checkout', 'addin', 'lunchTime', 'note', 'action'];
  dataSource: MatTableDataSource<WORK> = new MatTableDataSource<WORK>([]);
  empList: EMP[] = [];

  yearList: number[] = [new Date().getFullYear(), new Date().getFullYear() - 1]
  monthList: number[] = Array.from({length: 12}, (_, i) => i + 1);
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();

  constructor(public http: HttpClient, public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(http, snackBar);
  }

  ngOnInit(): void {
    this.getWorks();
    this.getListNhanVien();
  }

  getWorks() {
    const empId = this.selectedEmp || this.getUserInfo().empId;
    this.http.get<WORK[]>(`${WORK_API}/getShiftByMonthAndYear/${empId}/${this.selectedYear}/${this.selectedMonth}`).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
      }
    });
  }

  getListNhanVien() {
    this.http.get<EMP[]>(EMPLOYEE_API).subscribe((res) => {
      if (res) {
        this.empList = res;
      }
    });
  }

  export() {
    this.http
      .get(
        `${WORK_API}/exportExcel/${this.getUserInfo().empId}/${this.selectedYear}/${this.selectedMonth}`,
        { responseType: 'blob' }
      )
      .subscribe(
        (data: Blob) => {
          var newBlob = new Blob([data], { type: 'application/xlsx' });
          if (newBlob.size != 0) {
            saveAs(
              newBlob,
              `TS_${this.selectedYear}_${this.selectedMonth}_${this.getUserInfo().name}.xlsx`
            );
          } else {
            this.snackBar.open(
              'Đã xãy ra lỗi trong quá trình tổng hợp dữ liệu!'
            );
          }
        },
        (err: HttpErrorResponse) => {
          console.error('download failed:', err);
        }
      );
  }

  onHandleEdit(shift: WORK) {
    this.dialog.open(EditWorkComponent, {
      data: {
        shift,
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        shift = {...shift, ...result};
        this.http.put(`${WORK_API}/edit/${shift.shiftId}`, shift).subscribe(res => {
          if (res) {
            this.snackBar.open("Chỉnh sửa thành công!");
            this.getWorks();
          } else {
            this.snackBar.open("Chỉnh sửa không thành công!");
          }
        })
      }
    })
  }

  onHandleDelete(shift: WORK) {
    this.dialog.open(DeleteWorkComponent, {
      data: {
        shift,
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`${WORK_API}/${shift.shiftId}`).subscribe(res => {
          this.snackBar.open("Xoá thành công!");
          this.getWorks();
        })
      }
    })
  }
}
