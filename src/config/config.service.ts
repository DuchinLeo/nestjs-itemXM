/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-09 12:45:42
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 11:23:03
 */
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`,
    });

    // replace
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }
}
