const { pdf } = require("pdf-to-img");

const pdfLink = "./doc-retornado.pdf";

async function run() {
  const doc = await pdf(pdfLink, {  
      scale: 2.0, // use this for PDFs with high resolution images if the generated image is low quality
    });
  
  console.log(doc);
  
}

run()