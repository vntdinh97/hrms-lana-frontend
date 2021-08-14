import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMP } from 'src/app/models/employee';
import { EMPLOYEE_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../../component-base';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent extends ComponentBase implements OnInit {

  name: string = '';
  buttonName: string;
  title: string;

  constructor(
    public httpClient: HttpClient, 
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      super(httpClient, snackBar);
    }

  ngOnInit(): void {
    switch (this.data.action) {
      case 'add':
        this.buttonName = "Thêm";
        this.title = "Thêm nhân viên";
        break;
      case 'edit':
        this.name = this.data.emp.name;
        this.buttonName = "Lưu";
        this.title = "Chỉnh sửa nhân viên";
        break;
      default:
        this.name = this.data.emp.name;
        this.buttonName = "Xóa";
        this.title = "Xóa nhân viên";
        break;
    }
  }

  add() {
    switch (this.data.action) {
      case 'add':
        this.httpClient.post<EMP>(EMPLOYEE_API, {name: this.name}).subscribe(res => {
          if (res.empId) {
            this.notify("Thêm nhân viên thành công");
            this.dialogRef.close(true);
          } else {
            this.notify("Thêm nhân viên lỗi!");
            this.dialogRef.close(false);
          }
        })
        break;
      
      case 'edit':
        this.httpClient.put<EMP>(`${EMPLOYEE_API}/${this.data.emp.empId}`, {id: this.data.emp.id, name: this.name}).subscribe(res => {
          if (res.empId) {
            this.notify("Chỉnh sửa nhân viên thành công");
            this.dialogRef.close(true);
          } else {
            this.notify("Chỉnh sửa nhân viên lỗi");
            this.dialogRef.close(false);
          }
        })
        break;

      default:
        this.httpClient.delete<EMP>(`${EMPLOYEE_API}/${this.data.emp.empId}`).subscribe(res => {
          if (res.empId) {
            this.notify("Thêm nhân viên thành công");
            this.dialogRef.close(true);
          } else {
            this.notify("Thêm nhân viên lỗi!");
            this.dialogRef.close(false);
          }
        })
        break;
    }
  }
}
