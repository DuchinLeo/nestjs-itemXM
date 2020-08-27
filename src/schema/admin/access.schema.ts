/*
 * @Description: 权限模块
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-25 17:04:29
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 17:26:04
 */
/*
1、模块名称: 
  模块名称就是左侧的主菜单名称，
  如果增加数据的时候是模块，那么需要指定节点类型是模块，并且选择所属模块为顶级模块


2、节点类型： 1、表示模块   2、表示菜单     3、操作


3、操作名称:
  如果节点类型是菜单，那么操作名称就是左侧菜单的名称。
  如果节点类型是操作，那么操作名称就是具体的操作名称


4、操作地址：用户实际访问的地址


5、所属模块：模块（顶级模块）  菜单和操作（父亲模块）


*/
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const SchemaVessel = mongoose.Schema;
const d = new Date();

@Schema()
export class Access extends Document {
  // 模块名称
  @Prop()
  module_name: string;

  // 操作名称
  @Prop()
  action_name: string;

  // 节点类型： 1、表示模块 2、表示菜单 3、操作
  @Prop()
  type: number;

  // 路由跳转地址
  @Prop()
  url: string;

  // 此module_id和当前模块的_id关联  module_id=0 表示模块  混合类型
  @Prop({
    type: SchemaVessel.Types.Mixed,
  })
  module_id;

  @Prop({
    default: 100,
  })
  sort: number;

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

export const AccessSchema = SchemaFactory.createForClass(Access);
