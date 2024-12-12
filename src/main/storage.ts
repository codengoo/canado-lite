import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { homedir } from 'os';
import { join } from 'path';

export class Storage {
  private readonly basePath: string;
  static instance: Storage;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private async mkDirIfNotExist(dirpath: string): Promise<boolean> {
    try {
      await stat(dirpath);
      return true;
    } catch (error) {
      await mkdir(dirpath, { recursive: true });
      return false;
    }
  }

  private transformKey(key: string): string {
    return key.replace(/:/g, '__');
  }

  public async getItem<T>(key: string): Promise<T | null> {
    try {
      await this.mkDirIfNotExist(this.basePath);
      const filePath = join(this.basePath, this.transformKey(key) + '.json');
      const data = await readFile(filePath, 'utf-8');

      return JSON.parse(data) as T;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async setItem(key: string, value: object): Promise<boolean> {
    try {
      await this.mkDirIfNotExist(this.basePath);
      const filePath = join(this.basePath, this.transformKey(key) + '.json');
      const jsonData = JSON.stringify(value, null, 2);
      await writeFile(filePath, jsonData);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async removeItem(key: string): Promise<boolean> {
    try {
      await this.mkDirIfNotExist(this.basePath);
      const filePath = join(this.basePath, this.transformKey(key) + '.json');
      await unlink(filePath);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static getInstance(): Storage {
    if (this.instance) return this.instance;
    else {
      const basePath = join(homedir(), '.nacado');
      this.instance = new Storage(basePath);
      return this.instance;
    }
  }
}
