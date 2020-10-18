export { getFileFolder, getFileName } from "./file-name";
export {
  generateScreenshot,
  getImageData,
  getImageArrayBuffer,
} from "./exportor";

export function mapToArray<T, E>(m: Map<T, E>): { k: T; v: E }[] {
  let r: { k: T; v: E }[] = [];
  m.forEach((v, k) => {
    r.push({ v, k });
  });
  return r;
}
