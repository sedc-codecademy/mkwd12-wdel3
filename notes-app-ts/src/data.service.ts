import { readFile, writeFile } from "node:fs/promises";

export class DataService {
  // 1. Read json file
  static async readJSONFile<T>(path: string) {
    const stringData = await readFile(path, { encoding: "utf-8" });

    return JSON.parse(stringData) as T;
  }

  // 2. Save json file
  static async saveJSONFile<T>(path: string, data: T) {
    return writeFile(path, JSON.stringify(data, null, 2));
  }
}
