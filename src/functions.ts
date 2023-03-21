import { ShiftPerDay, ShiftDataByDay, DetailReport } from "./utils";
import daysOfWeek from "./shifts/days_of_week.json";
import shiftPerDay from "./shifts/shift_per_day.json";
import shifts from "./shifts/shift.json";

const getDayOfTheWeek = (shiftRow: string): ShiftDataByDay => {
  let shiftBreakdown: ShiftDataByDay = {
    dow: { dow: 0, name: "" },
    shift: { punchIn: "", punchOut: "" },
  };

  for (const day of daysOfWeek) {
    let regExp = new RegExp(`^${day.short_name}`);
    let bDown = shiftRow.split(regExp);
    if (bDown.length === 2) {
      shiftBreakdown.dow = day;
      [shiftBreakdown.shift.punchIn, shiftBreakdown.shift.punchOut] =
        bDown[1].split("-");
      break;
    }
  }

  return shiftBreakdown;
};

const normalizePunchTime = (punchTime: string): Date => {
  let [hours, minutes] = punchTime.split(":").map(Number);
  let newPunchTime = new Date();
  newPunchTime.setHours(hours, minutes);
  if (hours === 0 && minutes == 0) {
    newPunchTime.setDate(newPunchTime.getDate() + 1);
  }
  return newPunchTime;
};

const getShiftCost = (shiftRows: string[]): ShiftPerDay[] => {
  let finalShifts: any = [];

  shiftRows.forEach((shiftRow) => {
    let shiftCost: any = {};

    let shiftByDay = getDayOfTheWeek(shiftRow);
    shiftCost.dow = shiftByDay.dow;

    let datetimeIn = normalizePunchTime(shiftByDay.shift.punchIn);
    let datetimeOut = normalizePunchTime(shiftByDay.shift.punchOut);

    const sPD = shiftPerDay.filter((x) => x.dow === shiftByDay.dow.dow);
    let shitsFiltered = shifts.filter((obj) =>
      sPD.some((filterObj) => filterObj.shift_id === obj.shift_id)
    );

    for (const shift of shitsFiltered) {
      let mustPunchIn = normalizePunchTime(shift.punchIn);
      let mustPunchOut = normalizePunchTime(shift.punchOut);

      if (datetimeIn >= mustPunchIn && datetimeOut <= mustPunchOut) {
        shiftCost.shift = shift;
        var hours =
          Math.abs(datetimeIn.getTime() - datetimeOut.getTime()) / 3600000;
        shiftCost.dowPayment = hours * Number(shift.costPerHour);
        finalShifts.push(shiftCost);
        break;
      }
    }
  });

  return finalShifts;
};

export const calculatePayment = (data: Array<string>): DetailReport[] => {
  let report: any = [];
  data.forEach((record) => {
    let [employeeName, employeeShifts] = record.split("=");
    let shiftsCost = getShiftCost(employeeShifts.split(","));

    for (const cost of shiftsCost) {
      let reportDetail: any = {
        employeeName: employeeName,
        nameDow: cost.dow.name,
        totalPerDay: cost.dowPayment,
      };
      report.push(reportDetail);
    }
  });

  report.reduce((acc: any, obj: any) => {
    let key = obj.employeeName;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ nameDow: obj.nameDow, totalPerDay: obj.totalPerDay });
    return acc;
  }, {});

  return report;
};

export const validateFile = (data: Array<string>): string | null => {
  let error = null;

  for (let record of data) {
    let isValid = record.match(
      /^[A-Z]+=[A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2}(,[A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2})*$/
    );
    if (!isValid) {
      error =
        "One or more row(s) do not have a valid pattern, ie: 'RENE=MO10:00-12:00,TU10:00-12:00'";
      break;
    }
  }

  return error;
};
