import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { EMP } from 'src/app/models/employee';
import { EMPLOYEE } from 'src/app/utils/api_url';

@Component({
  selector: 'app-work-marking',
  templateUrl: './work-marking.component.html',
  styleUrls: ['./work-marking.component.scss']
})
export class WorkMarkingComponent implements OnInit {

  empList: EMP[] = [];
  selectedEmp: {empId: number, name: string} = null;
  checkIn: Date = new Date();
  checkOut: Date = new Date();

  @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
    @ViewChild(MatFormField) _matFormField: MatFormField;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.httpClient.get<EMP[]>(EMPLOYEE).subscribe(result => {
      this.empList = result;
    })
  }

}
