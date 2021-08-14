import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EMP } from 'src/app/models/employee';
import { EMPLOYEE_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';
import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';

@Component({
  selector: 'app-quan-ly-nhan-vien',
  templateUrl: './quan-ly-nhan-vien.component.html',
  styleUrls: ['./quan-ly-nhan-vien.component.scss']
})
export class QuanLyNhanVienComponent extends ComponentBase implements OnInit {

  dataSource: MatTableDataSource<EMP> = new MatTableDataSource<EMP>([]);
  displayedColumns: string[] = ['stt', 'name', 'action']


  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { 
      super(http, snackBar);
    }

  ngOnInit(): void {
    this.getListEmp();
  }

  getListEmp() {
    this.http.get<EMP[]>(EMPLOYEE_API).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  openDialogNhanVien(action: string, emp?: EMP) {
    const dialog = this.dialog.open(DialogEmployeeComponent, {
      width: '500px',
      height: '300px',
      data: {
        emp, action
      }
    })
    dialog.afterClosed().subscribe(res => {
      this.getListEmp()
    })
  } 

}
