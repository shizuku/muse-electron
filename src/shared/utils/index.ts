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

export function range(end: number): number[] {
  let r: number[] = [];
  for (let i = 0; i < end; ++i) {
    r.push(i);
  }
  return r;
}
