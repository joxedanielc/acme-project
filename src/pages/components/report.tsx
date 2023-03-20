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
      <tbody data-id={`reportrow`}>
        <>
          {summedData.map((detail: any, index: number) => {
            return (
              <tr key={index}>
                <td data-id={`reportname${index}`}>{detail.name}</td>
                <td data-id={`reporttotal${index}`}>{`${Math.trunc(
                  detail.total
                )} USD`}</td>
              </tr>
            );
          })}
        </>
      </tbody>
    </table>
  );
};

export default Report;
