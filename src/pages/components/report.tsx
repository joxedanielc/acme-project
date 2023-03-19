import React from "react";
import { FunctionComponent } from "react";
import { DetailReport } from "@/utils";

interface Props {
  details: DetailReport[];
}

const Report: FunctionComponent<Props> = ({ details }) => {
  let summedData = Object.values(
    details.reduce((acc: any, obj: any) => {
      let key = obj.employeeName;
      if (!acc[key]) {
        acc[key] = { name: key, total: 0 };
      }
      acc[key].total += obj.totalPerDay;
      return acc;
    }, {})
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <>
          {summedData.map((detail: any) => {
            return (
              <tr>
                <td>{detail.name}</td>
                <td>{detail.total}</td>
              </tr>
            );
          })}
        </>
      </tbody>
    </table>
  );
};

export default Report;
