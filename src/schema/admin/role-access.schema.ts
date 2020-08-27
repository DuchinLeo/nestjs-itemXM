/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-26 17:37:33
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 17:43:52
 */
/**
 * 权限-角色关联表
 */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const SchemaVessel = mongoose.Schema;

@Schema()
export class RoleAccess extends Document {
  @Prop({
    type: SchemaVessel.Types.ObjectId,
  })
  access_id;

  @Prop({
    type: SchemaVessel.Types.ObjectId,
  })
  role_id;
}

export const RoleAccessSchema = SchemaFactory.createForClass(RoleAccess);
