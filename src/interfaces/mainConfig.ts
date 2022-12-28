export interface IContextVersions {
  node: () => string;
  chrome: () => string;
  electron: () => string;
  os: () => string;
}

export interface IContextNode {
  fs: () => any;
  process: () => any;
}
