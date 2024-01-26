import consola from 'consola';
import * as fs from 'fs';

export interface Item {
    _id: string;
    code: string;
    description: string;
  }

export class JsonHelper {

    static readFromFile(filePath: string): Item[] {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as Item[];
    } catch (error) {
      consola.error('Error reading file:', error);
      throw error;
    }
  }

}