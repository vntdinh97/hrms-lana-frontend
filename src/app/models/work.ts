export interface WORK {
  shiftId?: number;
  checkIn: Date;
  checkOut: Date;
  remark?: string;
  empId: number;
  note?: string;
  addin: boolean;
  lunchTime: boolean;
}