import is from "electron-is";

export function getFileName(filePath: string): string {
  let l: string[];
  if (is.windows()) {
    l = filePath.split("\\");
  } else {
    l = filePath.split("/");
  }
  return l[l.length - 1];
}

export function getFileFolder(filePath: string): string {
  let fileName = getFileName(filePath);
  return filePath.substring(0, filePath.length - fileName.length);
}

export function getFileNameWithoutExtension(name: string): string {
  let p = name.search(".");
  if (p === -1) return name;
  else return name.substring(0, p + 1);
}

export function getExtension(name: string): string {
  let p = name.search(".");
  if (p === -1) return "";
  else return name.substring(p + 2);
}

export interface PathInfo {
  absolutePath: string;
  folder: string;
  name: string;
  nameWithoutExtension: string;
  extension: string;
}

export function parseFilePath(absolutePath: string): PathInfo {
  let d = is.windows() ? "\\" : "/";
  let folder = "";
  let name = "";
  let nameWithoutExtension = "";
  let extension = "";
  let p = 0;
  while (p != -1) {}

  return { absolutePath, folder, name, nameWithoutExtension, extension };
}
