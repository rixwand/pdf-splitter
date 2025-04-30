import { createPromptModule } from "inquirer";
interface IReturnPrompt {
  pdfPath: string;
  xlsxPath: string;
  outputPath: string;
}

export default async function (): Promise<IReturnPrompt> {
  try {
    const prompt = createPromptModule();
    const answer = await prompt([
      {
        name: "pdfPath",
        message: "Masukkan alamat file pdf: ",
        type: "input",
      },
      {
        name: "xlsxPath",
        message: "Masukkan alamat file excel yang berisi 'Nama penulis': ",
        type: "input",
      },
      {
        name: "outputPath",
        message: "Masukkan alamat folder untuk menyimpan output file: ",
        type: "input",
      },
    ]);
    return Promise.resolve(answer);
  } catch (err) {
    const error = err as Error;
    return Promise.reject(error.message);
  }
}
