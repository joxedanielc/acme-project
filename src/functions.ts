import { DaysOfShift, ShiftValue, ShiftPerDay } from "./utils";
import { useEffect, useMemo, useState } from "react";
import daysOfWeek from "./shifts/days_of_week.json";
import shiftPerDay from "./shifts/shift_per_day.json";
import shift from "./shifts/shift.json";

const getDayOfTheWeek = (
  shiftRow: string
): {
  dow: number;
  shift: string;
} => {
  let shitBreakdown = {
    dow: 0,
    shift: "",
  };

  for (const day of daysOfWeek) {
    let regExp = new RegExp(`^${day.short_name}`);
    let bDown = shiftRow.split(regExp);
    if (bDown.length === 2) {
      shitBreakdown.dow = day.dow;
      shitBreakdown.shift = bDown[1];
      break;
    }
  }

  return shitBreakdown;
};

const getShiftCost = (shiftRows: string[]) => {
  shiftRows.forEach((shiftRow) => {
    console.log(getDayOfTheWeek(shiftRow));
  });
};

export const calculatePayment = (data: Array<string>): number => {
  data.forEach((record, index) => {
    let recordSplit = record.split("=");
    console.log(recordSplit);
    let employeeName = recordSplit[0];
    console.log(employeeName);
    let employeeShifts = recordSplit[1].split(",");
    console.log(employeeShifts);
    getShiftCost(employeeShifts);
  });

  return 1;
};
