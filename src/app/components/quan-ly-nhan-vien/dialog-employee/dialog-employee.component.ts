import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMP } from 'src/app/models/employee';
import { EMPLOYEE } from 'src/app/utils/api_url';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent implements OnInit {

  name: string = '';
  buttonName: string;
  title: string;

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
        this.http.post<EMP>(EMPLOYEE, {name: this.name}).subscribe(res => {
          if (res.id) {
            this.snackBar.open("Thêm nhân viên","Thành công");
            this.dialogRef.close(true);
          } else {
            this.snackBar.open("Thêm nhân viên","Lỗi!");
            this.dialogRef.close(false);
          }
        })
        break;
      
      case 'edit':
        this.http.put<EMP>(`${EMPLOYEE}/${this.data.emp.id}`, {id: this.data.emp.id, name: this.name}).subscribe(res => {
          if (res.id) {
            this.snackBar.open("Chỉnh sửa nhân viên","Thành công");
            this.dialogRef.close(true);
          } else {
            this.snackBar.open("Chỉnh sửa nhân viên","Lỗi!");
            this.dialogRef.close(false);
          }
        })
        break;

      default:
        this.http.delete<EMP>(`${EMPLOYEE}/${this.data.emp.id}`).subscribe(res => {
          if (res.id) {
            this.snackBar.open("Thêm nhân viên","Thành công");
            this.dialogRef.close(true);
          } else {
            this.snackBar.open("Thêm nhân viên","Lỗi!");
            this.dialogRef.close(false);
          }
        })
        break;
    }
  }
}
