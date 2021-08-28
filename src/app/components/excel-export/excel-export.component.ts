import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EMP } from 'src/app/models/employee';
import { WORK } from 'src/app/models/work';
import { EMPLOYEE_API, WORK_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.scss']
})
export class ExcelExportComponent extends ComponentBase implements OnInit {

  selectedEmp: number;
  displayedColumns: string[] = ['checkin', 'checkout', 'note']
  dataSource: MatTableDataSource<WORK> = new MatTableDataSource<WORK>([]);
  empList: EMP[] = [];

  constructor(public http: HttpClient, public snackBar: MatSnackBar) { 
    super(http, snackBar);
  }

  ngOnInit(): void {
    const empId = this.getUserInfo().empId;
    this.http.get<WORK[]>(`${WORK_API}/${empId}`).subscribe(res => {
      if (res) {
        this.dataSource.data = res
      }
    })

    if (!this.getUserInfo().role) {
      
    }
  }

  getListNhanVien() {
    this.http.get<EMP[]>(EMPLOYEE_API).subscribe(res => {
      if (res) {
        this.empList = res;
      }
    })
  }

}
