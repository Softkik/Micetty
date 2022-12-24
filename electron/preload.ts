const { contextBridge } = require("electron");
import * as fs from "fs";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("node", {
  fs: () => fs,
  process: () => process,
});
