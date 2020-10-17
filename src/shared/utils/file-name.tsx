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
