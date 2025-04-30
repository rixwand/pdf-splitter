import splitPdf from "./splitPdf";
import prompt from "./prompt";

async function main() {
  try {
    const answer = await prompt();
    await splitPdf(answer);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
}

main();
