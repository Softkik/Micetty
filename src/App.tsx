import logo from "./logo.svg";
import "./App.css";
import { IContextNode, IContextVersions } from "./interfaces/mainConfig";
declare global {
  interface Window {
    versions: IContextVersions;
    node: IContextNode;
  }
}

function App() {
  console.log(window.node.fs().readdirSync(window.node.process().cwd()));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Versions: Node {window.versions.node()} Chrome{" "}
          {window.versions.chrome()}
        </p>
      </header>
    </div>
  );
}

export default App;
