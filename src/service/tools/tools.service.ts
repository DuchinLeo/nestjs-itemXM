/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:29:37
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 14:23:40
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  getCaptcha(): svgCaptcha.CaptchaObj {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }
}
