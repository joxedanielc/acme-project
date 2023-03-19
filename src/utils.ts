export interface FileUploaded {
  name: string;
}

export interface DaysOfShift {
  dow: number;
  name: string;
}

export interface ShiftValue {
  shift_id: number;
  punchIn: string;
  punchOut: string;
  costPerHour: string;
  currency: string;
}

export interface ShiftPerDay {
  dow: DaysOfShift;
  shift: ShiftValue;
  dowPayment: number;
}

export interface ShiftDataByDay {
  dow: DaysOfShift;
  shift: ShiftDetailByDay;
}

export interface ShiftDetailByDay {
  punchIn: string;
  punchOut: string;
}

export interface DetailReport {
  employeeName: string;
  nameDow: string;
  totalPerDay: number;
}
