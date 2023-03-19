import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { calculatePayment } from "@/functions";
import { DetailReport } from "@/utils";
import Report from "./report";

function FileUploadPage() {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [dataInFile, setDataInFile] = useState<string[]>();
  const [reportDetail, setReportDetail] = useState<DetailReport[]>([]);

  let fileReader: any;

  const cleanContent = (string: string) => {
    string = string.replace(/^\s*[\r\n]/gm, "");
    let array = string.split(new RegExp(/[\r\n]/gm));
    return array;
  };

  const handleFileRead = () => {
    let content = fileReader.result;
    content = cleanContent(content);
    setDataInFile(content);
  };

  const changeHandler = (event: any) => {
    let file = event.target.files;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (event: React.MouseEvent) => {
    console.log(dataInFile);

    if (dataInFile !== undefined && dataInFile.length > 0) {
      setReportDetail(calculatePayment(dataInFile));
    }

    let groupedData = reportDetail.reduce((acc: any, obj: any) => {
      let key = obj.employeeName;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ nameDow: obj.nameDow, totalPerDay: obj.totalPerDay });
      return acc;
    }, {});

    console.log(groupedData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.upload}>
        <label>{"Choose a file (.txt): "}</label>
        <input
          accept={".txt"}
          type="file"
          name="file"
          onChange={changeHandler}
        />
      </div>
      <button onClick={(e) => handleSubmission(e)} className={styles.button}>
        Calculate
      </button>
      {reportDetail.length > 0 && <Report details={reportDetail} />}
    </div>
  );
}

export default FileUploadPage;
