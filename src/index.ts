import XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

async function splitPdf(filePath: string) {
  const existingPdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const totalPages = pdfDoc.getPageCount();
  console.log("Total pages:", totalPages);

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();
    fs.writeFileSync(
      // path.join(__dirname, `../output/output_page_${i + 1}.pdf`),
      path.resolve("output", `page_${i + 1}.pdf`),
      pdfBytes
    );
    console.log(`Saved page ${i + 1}`);
  }
  const workbook = XLSX.readFile(path.join(__dirname, "../pdf/name.xlsx"));

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];

  // Get the first sheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const data = XLSX.utils
    .sheet_to_json(worksheet)
    .map((x: any) => x["Nama Penulis"]);

  data.forEach((name, i) => {
    fs.rename(
      path.resolve(`output/page_${i + 1}.pdf`),
      path.resolve(`output/${name}.pdf`),
      (err) => {
        console.log(err);
      }
    );
  });
}

splitPdf(path.join(__dirname, "../pdf/mail.pdf"));

// Load the file
