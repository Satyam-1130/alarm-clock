import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmGateway } from './alarm.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmSchema,Alarm } from 'src/Schema/alarm.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }])
  ],
  providers: [AlarmGateway, AlarmService],
})
export class AlarmModule {}
