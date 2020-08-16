/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:31:04
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 18:36:05
 */

// 通过中间件实现ejs模版配置
export class Config {
  static adminPath = 'admin';
  static sessionMaxAge = 30 * 1000 * 60;
}

export * from './config.module';
export * from './config.service';
