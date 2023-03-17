import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { FileUploaded } from "@/utils";
import { calculatePayment } from "@/functions";

function FileUploadPage() {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [dataInFile, setDataInFile] = useState<string[]>();

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
      calculatePayment(dataInFile);
    }
    event.preventDefault();
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
        {isFilePicked && (
          <div>
            <p>Result: {"name"}</p>
          </div>
        )}
      </div>
      <button onClick={(e) => handleSubmission(e)} className={styles.button}>
        Calculate
      </button>
    </div>
  );
}

export default FileUploadPage;
