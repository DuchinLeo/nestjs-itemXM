/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 21:32:20
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 22:24:31
 */
const d = new Date();
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GoodsType extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    default: 1,
  })
  status: number;

  @Prop({
    default: d.getTime(),
  })
  add_time: number;
}

export const GoodsTypeSchema = SchemaFactory.createForClass(GoodsType);
