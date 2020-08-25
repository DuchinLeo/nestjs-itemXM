/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 18:37:42
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-16 21:23:27
 */

import { format } from 'silly-datetime';

export class Helper {
  /* * 字符串截取
   *@str 截取字符串
   *@start 开始截取位置
   *@end 结束截取位置
   */
  static happ = '全局';
  static substring = function(str: string, start: number, end: number) {
    if (end) {
      return str.substring(start, end);
    } else {
      return str.substring(start);
    }
  };

  static formatTime(params) {
    return format(params, 'YYYY-MM-DD HH:mm');
  }
}
