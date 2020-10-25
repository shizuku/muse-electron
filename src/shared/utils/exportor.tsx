import html2canvas from "html2canvas";

export function generateScreenshot(
  element: HTMLElement
): Promise<HTMLCanvasElement> {
  return new Promise<HTMLCanvasElement>((resolve) => {
    resolve(html2canvas(element, { scale: 1 }));
  });
}

export function getImageData(canvas: HTMLCanvasElement): Promise<string> {
  return new Promise<string>((resolve) => {
    resolve(
      canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
    );
  });
}

export function getImageArrayBuffer(
  canvas: HTMLCanvasElement
): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    canvas.toBlob((b) => {
      b?.arrayBuffer().then((v) => resolve(v)) || reject();
    });
  });
}
