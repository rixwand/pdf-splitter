import XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { createPromptModule } from "inquirer";
type splitPdfProps = {
  pdfPath: string;
  xlsxPath: string;
  outputPath: string;
};
export default async function splitPdf({
  pdfPath,
  xlsxPath,
  outputPath,
}: splitPdfProps) {
  const prompt = createPromptModule();
  try {
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const workbook = XLSX.readFile(xlsxPath);
    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];
    // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];
    // Convert sheet to JSON
    const dataTable = XLSX.utils.sheet_to_json(worksheet);
    const tableName = Object.getOwnPropertyNames(dataTable[0]);
    tableName.shift();
    const { title } = await prompt([
      {
        name: "title",
        type: "list",
        message: "Pilih table yang akan dijadikan judul:  ",
        choices: tableName,
      },
    ]);
    const titles = dataTable.map((x: any) => x[title]);
    const totalPages = pdfDoc.getPageCount();
    console.log("Total pages:", totalPages);

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      if (!titles[i]) {
        const fileName = `page_${i + 1}.pdf`;
        fs.writeFileSync(path.join(outputPath, fileName), pdfBytes);
        console.log(`Saved page ${fileName}`);
      } else {
        const fileName = `${titles[i]}.pdf`;
        fs.writeFileSync(path.join(outputPath, fileName), pdfBytes);
        console.log(`Saved page ${fileName}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
