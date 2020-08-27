/*
 * @Description: 轮播图
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 17:10:53
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 17:27:30
 */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const d = new Date();
@Schema()
export class Focus extends Document {
  @Prop()
  title: string;

  @Prop()
  type: number;

  @Prop()
  focus_img: string;

  @Prop()
  link: string;

  @Prop()
  sort: number;

  @Prop({
    default: 1,
  })
  status: number;

  @Prop({
    default: d.getTime(),
  })
  add_time: number;
}

export const FocusSchema = SchemaFactory.createForClass(Focus);
