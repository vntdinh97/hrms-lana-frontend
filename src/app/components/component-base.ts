import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

export class ComponentBase {
  constructor(public httpClient: HttpClient, public snackBar: MatSnackBar) {
    
  }

  notify(message: string) {
    this.snackBar.open(message, "Đóng", { duration: 3000 })
  }
}