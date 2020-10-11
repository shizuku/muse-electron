import React, { useEffect, useState } from "react";
import { ipcRenderer, remote } from "electron";
import { Welcome } from "./components/welcome";
import "antd/dist/antd.css";
import "./app.css";
import { Content } from "./components/content";
import { Toolbar } from "./components/toolbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FileContext, File } from "./FileContext";
import { FileInfo, RecentContext } from "./RecentContext";
import Store from "electron-store";
import { getFileFolder, getFileName } from "../shared/utils";
import hotkeys from "hotkeys-js";
import { computed, observable } from "mobx";

const store = new Store({ name: "user", defaults: { "recent-files": [] } });

export class Heights {
  @observable header: number = 0;
  @observable toolbar: number = 0;
  @computed get content(): number {
    return (
      document.body.clientHeight - this.header - this.toolbar - this.footer
    );
  }
  @observable footer: number = 0;
}

const App: React.FC = () => {
  let [file, setFile] = useState<File>({
    fileName: "",
    filePath: "",
    data: "",
  });
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
  let h = new Heights();
  return (
    <div id="app">
      <RecentContext.Provider value={{ files, addFile }}>
        <FileContext.Provider value={file}>
          {file.data === "" ? (
            <>
              <Header h={h} />
              <Welcome />
            </>
          ) : (
            <>
              <Header h={h} />
              <Toolbar h={h} />
              <Content h={h} />
              <Footer h={h} />
            </>
          )}
        </FileContext.Provider>
      </RecentContext.Provider>
    </div>
  );
};

export default App;
