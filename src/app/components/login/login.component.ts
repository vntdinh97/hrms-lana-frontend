import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMP } from 'src/app/models/employee';
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
  confirmPassword: string;
  name: string;
  mode: string = 'login';
  constructor(public http: HttpClient, public snackBar: MatSnackBar, private router: Router) {
    super(http, snackBar);
    if (this.getUserInfo()) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.mode != 'login') {
      this.mode = 'login';
      return;
    }
    if (this.username && this.password) {
      const data = {username: this.username, password: this.password}
      this.http.post<EMP>(`${EMPLOYEE_API}/login`, data).subscribe(res => {
        if (res && res.empId) {
          localStorage.setItem('user', JSON.stringify(res));
          this.notify('Đăng nhập thành công')
          this.router.navigate(['/'])
        } else {
          this.notify('Username hoặc password chưa đúng!')
        }
      })
    } else {
      this.notify('Nhập đầy đủ username và password')
    }
  }

  onRegister() {
    if (this.mode !== 'register') {
      this.mode = 'register';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.notify('Xác nhận mật khẩu chưa khớp');
      return;
    }
    const data = {
      name: this.name,
      username: this.username,
      password: this.password,
    }
    this.http.post<EMP>(EMPLOYEE_API, data).subscribe(res => {
      if (res && res.empId) {
        this.notify('Đăng ký thành công!');
        this.mode = 'login';
        this.username = '';
        this.password = '';
      } else {
        this.notify('Đã có người đăng ký username này');
      }
    })
  }
}
