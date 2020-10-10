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
