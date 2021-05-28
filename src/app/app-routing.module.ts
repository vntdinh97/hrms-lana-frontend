import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { QuanLyNhanVienComponent } from './components/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { WorkMarkingComponent } from './components/work-marking/work-marking.component';


const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: 'work-marking', component: WorkMarkingComponent },
  { path: 'employee', component: QuanLyNhanVienComponent },
  { path: 'export', component: ExcelExportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
