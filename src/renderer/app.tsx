import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { GetStart } from "./components/get-start";
import "antd/dist/antd.css";
import "./app.css";
import { FileContent } from "./components/file-content";
import { Toolbar } from "./components/toolbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FileContext, File } from "./FileContext";

const App: React.FC = () => {
  let [file, setFile] = useState<File>({
    fileName: "",
    filePath: "",
    data: "",
  });
  useEffect(() => {
    ipcRenderer.on(
      "open-file-reply",
      (event, filePath: string, content: string) => {
        let l = filePath.split("/");
        let fileName = l[l.length - 1];
        if (content !== "") {
          setFile({ filePath, fileName, data: content });
        }
      }
    );
  });
  return (
    <div id="app">
      {file.data === "" ? (
        <GetStart />
      ) : (
        <FileContext.Provider value={file}>
          <Header />
          <Toolbar />
          <FileContent />
          <Footer />
        </FileContext.Provider>
      )}
    </div>
  );
};

export default App;
