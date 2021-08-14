import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { EMP } from 'src/app/models/employee';
import { WORK } from 'src/app/models/work';
import { EMPLOYEE_API, WORK_API } from 'src/app/utils/api_url';

@Component({
  selector: 'app-work-marking',
  templateUrl: './work-marking.component.html',
  styleUrls: ['./work-marking.component.scss']
})
export class WorkMarkingComponent implements OnInit {

  empList: EMP[] = [];
  selectedEmp: number = null;
  checkIn: Date;
  checkOut: Date;
  remark: string = '';

  @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
    @ViewChild(MatFormField) _matFormField: MatFormField;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.httpClient.get<EMP[]>(EMPLOYEE_API).subscribe(result => {
      this.empList = result;
    })
  }

  onSubmit() {
    const work: WORK = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      empId: this.selectedEmp,
      remark: this.remark,
    }
    this.httpClient.post(WORK_API, work).subscribe(res => {

    })
  }

  onClear() {
    this.selectedEmp = null;
    this.checkOut = null;
    this.checkIn = null;
    this.remark = '';
  }
}
