/**
 * This code is made to adjust the words list such as trimming blank space, remove duplicated words, etc.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

console.log(process.cwd())
const languagesPath = path.join(process.cwd(), "lang");
const encoding = "utf-8";

async function init() {
  const languages = await readdir(languagesPath);
  
  for (const lang of languages) {
    const _path = path.join(languagesPath, lang);
    const content = await readFile(_path, { encoding });
    if (!content || typeof content !== "string") {
      throw new Error(`Unable to read ${_path}: Missing content.`);
    };

    const array = content.split(/\r?\n/);

    const formattedArray = Array.from(new Set(
      array.map(word => word.trim().toLowerCase().replace(/[^\w\d\s]/gim, ""))
    ));
    
    await writeFile(_path, formattedArray.join("\n"), { encoding });
  };

  return console.log("Words list successfully adjusted.");
};

init();