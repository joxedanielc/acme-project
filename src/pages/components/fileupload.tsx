import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { calculatePayment, validateFile } from "@/functions";
import { DetailReport } from "@/utils";
import Report from "./report";

function FileUploadPage() {
  const [dataInFile, setDataInFile] = useState<string[]>();
  const [reportDetail, setReportDetail] = useState<DetailReport[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  };

  const handleSubmission = () => {
    if (dataInFile !== undefined && dataInFile.length > 0) {
      setError(validateFile(dataInFile));
      if (error === null) {
        setReportDetail(calculatePayment(dataInFile));
      }
    }
  };

  useEffect(() => {}, [reportDetail, error]);

  return (
    <div className={styles.container}>
      <div className={styles.upload}>
        <label>{"Choose a file (.txt): "}</label>
        <input
          data-id={`upload-file`}
          accept={".txt"}
          type="file"
          name="file"
          onChange={changeHandler}
        />
      </div>
      <button
        data-id={`calculate-shifts`}
        onClick={handleSubmission}
        className={styles.button}
      >
        Calculate
      </button>
      {error === null && reportDetail.length > 0 ? (
        <Report details={reportDetail} />
      ) : (
        <span data-id={`error-message`} className={styles.errormessage}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FileUploadPage;
