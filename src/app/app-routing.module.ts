import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuanLyNhanVienComponent } from './components/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { WorkMarkingComponent } from './components/work-marking/work-marking.component';
import { AuthGuard } from './utils/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'work-marking', component: WorkMarkingComponent },
      { path: 'employee', component: QuanLyNhanVienComponent },
      { path: 'export', component: ExcelExportComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
