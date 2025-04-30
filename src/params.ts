import { program } from "commander";

interface IReturnParams {
  pdfFile: string;
  xlsxFile: string;
  outDir: string;
}

export default function () {
  program
    .requiredOption(
      "--pdf-file <string>",
      "path to pdf file relative with current folder"
    )
    .requiredOption(
      "--xlsx-file <string>",
      "path to xlsx file contajin table for files title"
    )
    .option(
      "--out-dir <string>",
      "path to output file default current folder",
      "./"
    );
  program.parse();
  return program.opts() as IReturnParams;
}
