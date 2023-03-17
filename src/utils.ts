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
  costPerHour: number;
  currency: string;
}

export interface ShiftPerDay {
  dow: number;
  shift_id: number;
}
