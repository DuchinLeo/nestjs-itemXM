/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 15:54:05
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 18:04:15
 */
// import * as mongoose from 'mongoose';
// export const ArticleSchema = new mongoose.Schema({
//   title: String,
//   keywords: String,
//   author: Number,
//   status: String,
// });
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop()
  title: string;

  @Prop()
  keywords: string;

  @Prop()
  author: number;

  @Prop({
    default: '1',
  })
  status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
