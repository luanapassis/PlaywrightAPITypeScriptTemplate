import { readFileSync } from 'fs';
import { resolve } from 'path';

export class Utils {
    
    static generateRandomString(length: number): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
  
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters.charAt(index);
      }
  
      return result;
    }

    static generateRandomEmail(): string {
      return `user_${this.generateRandomString(8)}@qa.com.br`;
    }


    static loadQuery(relativePath: string): string {
      return readFileSync(resolve(__dirname, '..', relativePath), 'utf-8');
    }

  }
  