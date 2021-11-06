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

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.scss'],
})
export class ExcelExportComponent extends ComponentBase implements OnInit {
  selectedEmp: number;
  displayedColumns: string[] = ['checkin', 'checkout', 'note'];
  dataSource: MatTableDataSource<WORK> = new MatTableDataSource<WORK>([]);
  empList: EMP[] = [];

  constructor(public http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  ngOnInit(): void {
    const empId = this.getUserInfo().empId;
    this.http.get<WORK[]>(`${WORK_API}/${empId}`).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
      }
    });

    if (!this.getUserInfo().role) {
    }
  }

  getListNhanVien() {
    this.http.get<EMP[]>(EMPLOYEE_API).subscribe((res) => {
      if (res) {
        this.empList = res;
      }
    });
  }

  export() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    this.http
      .get(
        `${WORK_API}/exportExcel/${this.getUserInfo().empId}/${year}/${month}`,
        { responseType: 'blob' }
      )
      .subscribe(
        (data: Blob) => {
          var newBlob = new Blob([data], { type: 'application/xlsx' });
          if (newBlob.size != 0) {
            saveAs(
              newBlob,
              `TS_${year}_${month}_${this.getUserInfo().name}.xlsx`
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
}
