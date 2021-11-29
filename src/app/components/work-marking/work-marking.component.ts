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
  types: string[] = [
    'Do inspect',
    'In office to do timesheet, do claim',
    'Office + Traveling to',
    'Compensatory day',
    'Annual leave',
    'Khác ...'
  ]
  selectedType = this.types[0];
  remark: string = this.types[0];
  isRemarkDisabled: boolean = false;
  isAddin: boolean = false;
  isLunchTime: boolean = false;

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
    if (this.checkIn > this.checkOut) {
      this.notify('Bạn nhập chưa đúng điều kiện, hãy thử lại');
      return;
    }
    const work: WORK = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      empId: this.getUserInfo().empId,
      remark: this.remark,
      addin: this.isAddin,
      lunchTime: this.isLunchTime
    }
    this.httpClient.post<WORK>(WORK_API, work).subscribe(res => {
      if (res && res[0].shiftId) {
        this.notify('Nhập thành công');
        this.checkOut = null;
        this.checkIn = null;
        this.remark = '';
        this.isAddin = false;
        this.isLunchTime = false;
      } else {
        this.notify('Thử lại')
      }
    })
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

  onClear() {
    this.selectedEmp = null;
    this.checkOut = null;
    this.checkIn = null;
    this.remark = '';
    this.isLunchTime = false;
    this.isAddin = false;
    this.selectedType = 'Do inspect'
  }
}
