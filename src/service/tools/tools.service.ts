/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:29:37
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 18:49:41
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as MD5 from 'md5';
// 日期格式化工具
import { format } from 'silly-datetime';

import { join, extname } from 'path';
import { Config } from '../../config/config';

// 创建目录
import * as mkdirp from 'mkdirp';

import { createWriteStream } from 'fs';

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

  getTime() {
    const d = new Date();
    return d.getTime();
  }

  /**
   * 获取日期
   * 根据日期创建目录
   * 实现上传
   * 返回图片的保存地址
   */
  uploadFile(file) {
    if (file) {
      const day = format(new Date(), 'YYYYMMDD');

      const d = this.getTime();

      // 创建目录
      const dir = join(__dirname, `../../../public/${Config.uploadDir}`, day);
      console.log('文件保存目录创建前dir', dir);
      mkdirp.sync(dir);

      const uploaDir = join(dir, d + extname(file.originalname));
      console.log('文件保存目录uploaDir', uploaDir);
      // 3实现上传 保存文件
      const writeImage = createWriteStream(uploaDir);
      writeImage.write(file.buffer);
      console.log('day', day);
      // 4 返回图片的保存地址
      const saveDir = join(
        Config.uploadDir,
        day,
        `${d}${extname(file.originalname)}`,
      );

      return saveDir;
    } else {
      return '';
    }
  }
}
