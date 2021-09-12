import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMP } from 'src/app/models/employee';
import { WORK } from 'src/app/models/work';
import { EMPLOYEE_API, WORK_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-work-marking',
  templateUrl: './work-marking.component.html',
  styleUrls: ['./work-marking.component.scss']
})
export class WorkMarkingComponent extends ComponentBase implements OnInit {

  empList: EMP[] = [];
  selectedEmp: number = null;
  checkIn: Date;
  checkOut: Date;
  remark: string = '';

  @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
    @ViewChild(MatFormField) _matFormField: MatFormField;

  constructor(public httpClient: HttpClient, public snackBar: MatSnackBar) { 
    super(httpClient, snackBar)
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.httpClient.get<EMP[]>(EMPLOYEE_API).subscribe(result => {
      this.empList = result;
    })
  }

  onSubmit() {
    // if (this.checkIn > this.checkOut || this.checkOut >= new Date()) {
    //   this.notify('Chưa đúng ngày giờ');
    //   return;
    // }
    const work: WORK = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      empId: this.getUserInfo().empId,
      remark: this.remark,
    }
    this.httpClient.post<WORK>(WORK_API, work).subscribe(res => {
      if (res && res[0].shiftId) {
        this.notify('Nhập thành công');
        this.checkOut = null;
        this.checkIn = null;
        this.remark = '';
      } else {
        this.notify('Thử lại')
      }
    })
  }

  onClear() {
    this.selectedEmp = null;
    this.checkOut = null;
    this.checkIn = null;
    this.remark = '';
  }
}
