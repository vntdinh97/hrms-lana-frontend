import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { HolidayConfigComponent } from './components/holiday-config/holiday-config.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuanLyNhanVienComponent } from './components/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { WorkMarkingComponent } from './components/work-marking/work-marking.component';
import { AuthGuard } from './utils/auth.guard';
import { RoleGuard } from './utils/role.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'work-marking', component: WorkMarkingComponent },
      { path: 'employee', component: QuanLyNhanVienComponent, canActivate: [RoleGuard]  },
      { path: 'holiday-config', component: HolidayConfigComponent, canActivate: [RoleGuard]},
      { path: 'export', component: ExcelExportComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
