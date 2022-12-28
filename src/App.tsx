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

declare global {
  interface Window {
    versions: IContextVersions;
    node: IContextNode;
  }
}

function App() {
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
        <section className="sidebar">
          <div className="Logo-Section">
            <img alt="logo" src={logo} className="Logo-Image" id="logo-image" />
            <span className="Logo-Name">MICETTY</span>
            <Tooltip
              anchorId="logo-image"
              place="right"
              className="sidebar-tooltip"
            >
              <span className="Logo-Name-Tooltip">MICETTY</span>
            </Tooltip>
          </div>
          <div className="Buttons">
            <Button_Sidebar
              className={"btn btn-sidebar"}
              id={"sidebar-hosts"}
              clickHandle={() => console.log(1)}
            >
              <FontAwesomeIcon icon={faServer} className="sidebar-icon" />
              <span className="sidebar-text">Hosts</span>
            </Button_Sidebar>
            <Tooltip
              anchorId="sidebar-hosts"
              content="Hosts"
              place="right"
              className="sidebar-tooltip"
            />
            <Button_Sidebar
              className={"btn btn-sidebar"}
              id={"sidebar-sftp"}
              clickHandle={() => console.log(1)}
            >
              <FontAwesomeIcon icon={faFolder} className="sidebar-icon" />
              <span className="sidebar-text">SFTP</span>
            </Button_Sidebar>
            <Tooltip
              anchorId="sidebar-sftp"
              content="SFTP"
              place="right"
              className="sidebar-tooltip"
            />
            <Button_Sidebar
              className={"btn btn-sidebar"}
              id={"sidebar-pf"}
              clickHandle={() => console.log(1)}
            >
              <FontAwesomeIcon icon={faCodeBranch} className="sidebar-icon" />
              <span className="sidebar-text">Port Forwarding</span>
            </Button_Sidebar>
            <Tooltip
              anchorId="sidebar-pf"
              content="Port Forwarding"
              place="right"
              className="sidebar-tooltip"
            />
            <Button_Sidebar
              className={"btn btn-sidebar"}
              id={"sidebar-snippets"}
              clickHandle={() => console.log(1)}
            >
              <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
              <span className="sidebar-text">Snippets</span>
            </Button_Sidebar>
            <Tooltip
              anchorId="sidebar-snippets"
              content="Snippets"
              place="right"
              className="sidebar-tooltip"
            />
          </div>
        </section>
        <section className="ContentBlock">
          <Outlet />
        </section>
      </section>
    </div>
  );
}

export default App;
