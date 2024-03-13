window.onload = function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js";
};

const pdfLink = "../doc-retornado.pdf";

async function handleFileSelect() {
  var antes = Date.now();
  const pdf = await pdfjsLib.getDocument(pdfLink).promise;
  const page = await pdf.getPage(1);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const viewport = page.getViewport({ scale: 5 });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  const renderTask = page.render(renderContext);
  await renderTask.promise;

  const image = imageToZ64(canvas);
  var duracao = Date.now() - antes;
  console.log("levou " + duracao + "ms");
  BrowserPrint.getLocalDevices(({ deviceList }) => {
    const zpl = `
        ^XA^LH0,0^FWN^PON^PMN^LRN
        ^FO10,10^GFA,${image.length},${image.length},${image.rowlen},${image.z64}
        ^XZ`;

    deviceList[0].send(zpl);
  });
}
