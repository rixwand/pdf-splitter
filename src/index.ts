import splitPdf from "./splitPdf";
import params from "./params";

async function main() {
  try {
    const {
      outDir: outputPath,
      pdfFile: pdfPath,
      xlsxFile: xlsxPath,
    } = params();
    await splitPdf({
      outputPath,
      pdfPath,
      xlsxPath,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
}

main();
