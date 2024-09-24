import { readFile, writeFile } from "node:fs/promises";

export class DataService {
  //1. Read json file
  static readJSONFile = async path => {
    const jsonData = await readFile(path, "utf-8");

    return JSON.parse(jsonData);
  };

  //2. Save json file
  static saveJSONFile = async (path, data) => {
    return writeFile(path, JSON.stringify(data, null, 2));
  };
}
