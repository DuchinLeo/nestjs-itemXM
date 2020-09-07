/*
 * @Description: 上传分片
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-02 15:02:52
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-04 14:52:13
 */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const d = new Date();

@Schema()
export class UploadChunk extends Document {
  @Prop()
  upload_list: string;

  @Prop()
  file_name: string;

  @Prop()
  file_hash: string;

  @Prop()
  file_type: string;

  @Prop()
  file_size: number;

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

export const UploadChunkSchema = SchemaFactory.createForClass(UploadChunk);
