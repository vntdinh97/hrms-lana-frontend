import * as XLSX from 'xlsx';
export class ExcelHelper {
  shifts: any[];
  year: number;
  month: number;
  sheetName: string;
  fileName: string;
  constructor(shifts: any[] = [],
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth() + 1,
    sheetName: string = 'ExampleName',
    fileName: string = 'Shifts',) {
      this.fileName = fileName;
      this.sheetName = sheetName;
      this.month = month;
      this.year = year;
      this.shifts = shifts;
  }

  export() {
    XLSX.readFile('./Template.xlsx');
  }
}