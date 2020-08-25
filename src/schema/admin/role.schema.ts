/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-16 17:18:50
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-16 17:23:22
 */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const d = new Date();

@Schema()
export class Role extends Document {
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
  add_time: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
