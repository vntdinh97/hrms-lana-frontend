import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPLOYEE_API } from 'src/app/utils/api_url';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentBase implements OnInit {

  username: string;
  password: string;
  constructor(public http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar)
  }

  ngOnInit(): void {
  }

  login() {
    if (this.username && this.password) {
      const data = {username: this.username, password: this.password}
      this.http.post(`${EMPLOYEE_API}/login`, data).subscribe(res => {
        localStorage.setItem('user', res.toString());
      })
    }
  }

}
