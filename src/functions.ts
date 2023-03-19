import { ShiftPerDay, ShiftDataByDay, DetailReport } from "./utils";
import daysOfWeek from "./shifts/days_of_week.json";
import shiftPerDay from "./shifts/shift_per_day.json";
import shifts from "./shifts/shift.json";

const getDayOfTheWeek = (shiftRow: string): ShiftDataByDay => {
  let shitBreakdown: ShiftDataByDay = {
    dow: { dow: 0, name: "" },
    shift: { punchIn: "", punchOut: "" },
  };

  for (const day of daysOfWeek) {
    let regExp = new RegExp(`^${day.short_name}`);
    let bDown = shiftRow.split(regExp);
    if (bDown.length === 2) {
      shitBreakdown.dow = day;
      shitBreakdown.shift = {
        punchIn: bDown[1].split("-")[0],
        punchOut: bDown[1].split("-")[1],
      };
      break;
    }
  }

  return shitBreakdown;
};

const normalizePunchTime = (punchTime: string): Date => {
  let hours: number = Number(punchTime.split(":")[0]);
  let minutes: number = Number(punchTime.split(":")[1]);
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

      if (datetimeIn >= mustPunchIn) {
        if (datetimeOut <= mustPunchOut) {
          shiftCost.shift = shift;
          var hours =
            Math.abs(datetimeIn.getTime() - datetimeOut.getTime()) / 3600000;
          shiftCost.dowPayment = hours * Number(shift.costPerHour);
          finalShifts.push(shiftCost);
          break;
        }
      }
    }
  });

  return finalShifts;
};

export const calculatePayment = (data: Array<string>): DetailReport[] => {
  let report: any = [];
  data.forEach((record) => {
    let recordSplit = record.split("=");
    let employeeShifts = recordSplit[1].split(",");
    let shiftsCost = getShiftCost(employeeShifts);

    for (const cost of shiftsCost) {
      let reportDetail: any = {};
      reportDetail.employeeName = recordSplit[0];
      reportDetail.nameDow = cost.dow.name;
      reportDetail.totalPerDay = cost.dowPayment;
      report.push(reportDetail);
    }
  });

  return report;
};
