import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Alarm {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true, unique: true })
  alarm_time: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type AlarmDocument = Alarm & Document;
export const AlarmSchema = SchemaFactory.createForClass(Alarm);