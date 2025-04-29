import inquirer from "inquirer";
import { createInterface } from "readline";
interface IReturnPrompt {
  pdfPath: string;
  xlsxPath: string;
  outputPath: string;
}

export default async function (): Promise<IReturnPrompt> {
  // TODO: Implement the readline and inquirer prompt
  return {
    outputPath: "",
    xlsxPath: "",
    pdfPath: "",
  };
}
