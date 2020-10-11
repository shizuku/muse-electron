import React, { useEffect, useState } from "react";
import { ipcRenderer, remote } from "electron";
import { Welcome } from "./components/welcome";
import "antd/dist/antd.css";
import "./app.css";
import { FileContent } from "./components/file-content";
import { Toolbar } from "./components/toolbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FileContext, File } from "./FileContext";
import { FileInfo, RecentContext } from "./RecentContext";
import Store from "electron-store";
import { getFileFolder, getFileName } from "../shared/utils";
import hotkeys from "hotkeys-js";

const store = new Store({ name: "user", defaults: { "recent-files": [] } });

const App: React.FC = () => {
  let [file, setFile] = useState<File>({
    fileName: "",
    filePath: "",
    data: "",
  });
  console.log(remote.app.getPath("appData"));
  let r = (store.get("recent-files") as FileInfo[]) || [];
  let [files, setFiles] = useState<FileInfo[]>(r);
  const addFile = (f: FileInfo) => {
    let re = [...files];
    for (let i = 0; i < re.length; ++i) {
      if (re[i].path === f.path) {
        re[i].time = f.time;
        setFiles(re);
        re.sort((a, b) => b.time - a.time);
        store.set("recent-files", re);
        return;
      }
    }
    re.push(f);
    setFiles(re);
    re.sort((a, b) => b.time - a.time);
    store.set("recent-files", re);
  };
  useEffect(() => {
    ipcRenderer.on(
      "open-file-reply",
      (event, filePath: string, content: string) => {
        let fileName = getFileName(filePath);
        let fileFolder = getFileFolder(filePath);
        console.log(fileFolder);
        if (content !== "") {
          setFile({ filePath, fileName, data: content });
          addFile({
            name: fileName,
            path: filePath,
            folder: fileFolder,
            time: Date.now(),
          });
        }
      }
    );
    hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("toggle-dev-tools");
    });
  });
  return (
    <div id="app">
      <RecentContext.Provider value={{ files, addFile }}>
        <FileContext.Provider value={file}>
          {file.data === "" ? (
            <>
              <Header />
              <Welcome />
            </>
          ) : (
            <>
              <Header />
              <Toolbar />
              <FileContent />
              <Footer />
            </>
          )}
        </FileContext.Provider>
      </RecentContext.Provider>
    </div>
  );
};

export default App;
