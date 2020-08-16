/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:29:37
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 18:43:18
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as MD5 from 'md5';

@Injectable()
export class ToolsService {
  // 创建svg验证码
  getCaptcha(): svgCaptcha.CaptchaObj {
    const captcha = svgCaptcha.create({
      size: 1,
      fontSize: 36,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }

  getMd5(str: string): string {
    return MD5(str);
  }

  // 处理错误
  async errorRedirect(res, redirectUrl, message) {
    await res.render('admin/public/error', {
      message: message,
      redirectUrl: redirectUrl,
    });
  }

  // 成功处理
  async successRedirect(res, redirectUrl) {
    await res.render('admin/public/success', {
      redirectUrl: redirectUrl,
    });
  }
}
