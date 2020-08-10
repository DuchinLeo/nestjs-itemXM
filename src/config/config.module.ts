/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-09 12:45:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 11:25:20
 */
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
      // useValue: new ConfigService('.env'),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
