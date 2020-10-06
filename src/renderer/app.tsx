import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";
import { GetStart } from "./components/get-start";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./app.css";

interface ITab {
  tab: JSX.Element;
  closable: boolean;
  content: JSX.Element;
}

interface OpenFileReply {
  fileName: string;
  content: string;
}

const App: React.FC = () => {
  let [tabs, setTabs] = useState<ITab[]>([
    {
      tab: <span>Get Start</span>,
      closable: false,
      content: <GetStart />,
    },
  ]);
  let [activeKey, setActiveKey] = useState("0");
  useEffect(() => {
    ipcRenderer.on("open-file-reply", (event, arg: OpenFileReply) => {
      if (arg.content !== "") {
        setTabs([
          ...tabs,
          {
            tab: <span>{arg.fileName}</span>,
            closable: true,
            content: (
              <MuseNotation
                notation={
                  new Notation(JSON.parse(arg.content), new MuseConfig())
                }
              />
            ),
          },
        ]);
      }
    });
  });
  const onChange = (k: string) => {
    setActiveKey(k);
  };
  const onEdit = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
    } else if (action === "remove") {
    }
  };
  return (
    <div id="app">
      <header></header>
      <Tabs
        hideAdd
        tabBarGutter={1}
        type="editable-card"
        activeKey={activeKey.toString()}
        onChange={onChange}
        onEdit={onEdit}
      >
        {tabs.map((it, idx) => (
          <Tabs.TabPane tab={it.tab} key={idx} closable={it.closable} forceRender={true}>
            {it.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
