import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { QuanLyNhanVienComponent } from './components/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { WorkMarkingComponent } from './components/work-marking/work-marking.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogEmployeeComponent } from './components/quan-ly-nhan-vien/dialog-employee/dialog-employee.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditWorkComponent } from './components/excel-export/edit-work/edit-work.component';
import { DeleteWorkComponent } from './components/excel-export/delete-work/delete-work.component';
import { HolidayConfigComponent } from './components/holiday-config/holiday-config.component';
import { AddHolidayComponent } from './components/holiday-config/add-holiday/add-holiday.component';

@NgModule({
  declarations: [
    AppComponent,
    QuanLyNhanVienComponent,
    ExcelExportComponent,
    WorkMarkingComponent,
    DialogEmployeeComponent,
    LoginComponent,
    HomeComponent,
    EditWorkComponent,
    DeleteWorkComponent,
    HolidayConfigComponent,
    AddHolidayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  entryComponents: [
    DialogEmployeeComponent,
    EditWorkComponent,
    DeleteWorkComponent,
    AddHolidayComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
