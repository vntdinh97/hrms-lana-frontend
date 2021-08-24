import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMP } from 'src/app/models/employee';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase implements OnInit {
  user: EMP;
  constructor(public http: HttpClient, public snackBar: MatSnackBar, private router: Router) {
    super(http, snackBar);
  }

  ngOnInit(): void {
    this.user = this.getUserInfo();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
