import logo from "./images/logo.svg";
import "./App.css";
import { IContextNode, IContextVersions } from "./interfaces/mainConfig";
import { Outlet } from "react-router-dom";
import Button_Sidebar from "./components/Button.Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faFolder,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState } from "react";

declare global {
  interface Window {
    versions: IContextVersions;
    node: IContextNode;
  }
}

function App() {
  let [action, setAction] = useState("hosts");
  return (
    <div className="App">
      <div
        className={
          "padding" + (window.versions.os() === "darwin")
            ? " MacOS-Padding"
            : ""
        }
      ></div>
      <section className="main-app">
        <section className="sidebar-ma">
          <div className="Logo-Section">
            <img alt="logo" src={logo} className="Logo-Image" id="logo-image" />
            <span className="Logo-Name">MICETTY</span>
            <Tooltip
              anchorId="logo-image"
              place="right"
              className="sidebar-tooltip"
            >
              <div className="Logo-Name-Tooltip">MICETTY</div>
            </Tooltip>
          </div>
          <section className="sidebar">
            <div className="Buttons">
              <Button_Sidebar
                className={
                  "btn btn-sidebar" + (action == "hosts" ? " active" : "")
                }
                id={"sidebar-hosts"}
                clickHandle={() => setAction("hosts")}
              >
                <i className="mtty-tasks sidebar-icon" />
                <div className="sidebar-text">Hosts</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-hosts"
                content="Hosts"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar" + (action == "sftp" ? " active" : "")
                }
                id={"sidebar-sftp"}
                clickHandle={() => setAction("sftp")}
              >
                <i className="mtty-folder sidebar-icon" />
                <div className="sidebar-text">SFTP</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-sftp"
                content="SFTP"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar" + (action == "pf" ? " active" : "")
                }
                id={"sidebar-pf"}
                clickHandle={() => setAction("pf")}
              >
                <i className="mtty-network sidebar-icon" />
                <div className="sidebar-text">Port Forwarding</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-pf"
                content="Port Forwarding"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar" + (action == "snippets" ? " active" : "")
                }
                id={"sidebar-snippets"}
                clickHandle={() => setAction("snippets")}
              >
                <i className="mtty-file-code sidebar-icon" />
                <div className="sidebar-text">Snippets</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-snippets"
                content="Snippets"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar" + (action == "history" ? " active" : "")
                }
                id={"sidebar-history"}
                clickHandle={() => setAction("history")}
              >
                <i className="mtty-clock sidebar-icon" />
                <div className="sidebar-text">History</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-history"
                content="History"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar sidebar-console" +
                  (action == "code1" ? " active" : "")
                }
                id={"sidebar-code1"}
                clickHandle={() => setAction("code1")}
              >
                <i className="mtty-terminal sidebar-icon" />
                <div className="sidebar-text">Kubay Design VPS</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-code1"
                content="Kubay Design VPS"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar sidebar-console" +
                  (action == "code2" ? " active" : "")
                }
                id={"sidebar-code2"}
                clickHandle={() => setAction("code2")}
              >
                <i className="mtty-terminal sidebar-icon" />
                <div className="sidebar-text">Kubay Design VPS</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-code2"
                content="Kubay Design VPS"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar sidebar-console" +
                  (action == "code3" ? " active" : "")
                }
                id={"sidebar-code3"}
                clickHandle={() => setAction("code3")}
              >
                <i className="mtty-terminal sidebar-icon" />
                <div className="sidebar-text">Kubay Design VPS</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-code3"
                content="Kubay Design VPS"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar sidebar-console" +
                  (action == "code4" ? " active" : "")
                }
                id={"sidebar-code4"}
                clickHandle={() => setAction("code4")}
              >
                <i className="mtty-terminal sidebar-icon" />
                <div className="sidebar-text">Kubay Design VPS</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-code4"
                content="Kubay Design VPS"
                place="right"
                className="sidebar-tooltip"
              />
              <Button_Sidebar
                className={
                  "btn btn-sidebar sidebar-console" +
                  (action == "code5" ? " active" : "")
                }
                id={"sidebar-code5"}
                clickHandle={() => setAction("code5")}
              >
                <i className="mtty-terminal sidebar-icon" />
                <div className="sidebar-text">Kubay Design VPS</div>
              </Button_Sidebar>
              <Tooltip
                anchorId="sidebar-code5"
                content="Kubay Design VPS"
                place="right"
                className="sidebar-tooltip"
              />
            </div>
          </section>
        </section>
        <section className="ContentBlock">
          <Outlet />
        </section>
      </section>
    </div>
  );
}

export default App;
