import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";
import { GetStart } from "./components/get-start";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./app.css";
import { FileContent } from "./components/file-content";

interface ITab {
  tab: React.ReactNode;
  closable: boolean;
  content: React.ReactNode;
  key: string;
}

const App: React.FC = () => {
  let [panes, setPanes] = useState<ITab[]>([
    {
      tab: <i>Get Start</i>,
      closable: false,
      content: <GetStart />,
      key: "0",
    },
  ]);
  let [activeKey, setActiveKey] = useState("0");
  let [nextKey, setNextKey] = useState(1);
  useEffect(() => {
    ipcRenderer.on(
      "open-file-reply",
      (event, filePath: string, content: string) => {
        let l = filePath.split("/");
        let fileName = l[l.length - 1];
        if (content !== "") {
          setPanes([
            ...panes,
            {
              tab: <span>{fileName}</span>,
              closable: true,
              content: (
                <FileContent
                  fileName={fileName}
                  filePath={filePath}
                  data={content}
                />
              ),
              key: `${nextKey}`,
            },
          ]);
          setActiveKey(`${nextKey}`);
          setNextKey(nextKey + 1);
        }
      }
    );
  });
  const onChange = (k: string) => {
    setActiveKey(k);
  };
  const add = () => {
    setPanes([
      ...panes,
      {
        tab: "New Tab",
        content: "Content of new Tab",
        key: `${nextKey}`,
        closable: true,
      },
    ]);
    setActiveKey(`${nextKey}`);
    setNextKey(nextKey + 1);
  };
  const remove = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
  ) => {
    let newActiveKey = activeKey;
    let lastIndex = 0;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else if (action === "remove") {
      remove(targetKey);
    }
  };
  return (
    <div id="app">
      <Tabs
        className="tabs"
        hideAdd
        tabBarGutter={0}
        type="editable-card"
        activeKey={activeKey.toString()}
        onChange={onChange}
        onEdit={onEdit}
        tabBarStyle={{ height: "2.3rem" }}
      >
        {panes.map((it, idx) => (
          <Tabs.TabPane
            tab={it.tab}
            key={idx}
            closable={it.closable}
            forceRender={true}
          >
            <div className="tab-content">{it.content}</div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
