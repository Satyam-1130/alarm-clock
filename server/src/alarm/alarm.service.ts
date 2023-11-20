import { Injectable, Logger } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alarm } from '../Schema/alarm.schema';
import { WsException } from '@nestjs/websockets';
// import { WsException } from '@nestjs/websockets';

@Injectable()
export class AlarmService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectModel(Alarm.name)
    private readonly AlarmModel: Model<Alarm>,
  ) {}

  private readonly logger = new Logger(AlarmService.name);

  async create(createAlarmDto: CreateAlarmDto, server: any) {
    const { alarm_time, user_id } = createAlarmDto;
    const [hours, minutes] = alarm_time.split(':');

    try {
      const existingAlarm = await this.AlarmModel.findOne({ alarm_time });

      if (existingAlarm) {
        return {
          status: 'error',
          message: 'An alarm with the same time already exists',
        };
      }
      const newAlarm = await this.AlarmModel.create(createAlarmDto);
      const alarm_id = newAlarm._id;

      const job = new CronJob(`1 ${minutes} ${hours} * * *`, () => {
        server.emit(user_id, {
          alarm_notification: `${hours}:${minutes} Alarm !`,
          alarm_id,
          user_id,
        });
        this.logger.warn('alarm', alarm_time);
      });

      this.schedulerRegistry.addCronJob(user_id + alarm_id, job);
      job.start();
      this.logger.warn('alarm created for time', alarm_time);
      return {
        status: 'success',
        message: 'Alarm created successfully',
        alarm: newAlarm,
      };
    } catch (error) {
      throw new WsException('Failed to create alarm: ' + error.message);
    }
  }

  async findAll(user_id: string) {
    return this.AlarmModel.find({ user_id: user_id });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} alarm`;
  // }

  // update(id: number, updateAlarmDto: UpdateAlarmDto) {
  //   return `This action updates a #${id} alarm`;
  // }

  async remove(_id: string) {
    try {
      const deletedAlarm = await this.AlarmModel.findOneAndDelete({ _id });
      console.log(deletedAlarm);
      if (deletedAlarm) {
        const user_id = deletedAlarm.user_id;
        const alarm_id = _id;
        const job = this.schedulerRegistry.getCronJob(user_id + alarm_id);
        job.stop();
      }
      return `This action removes a #${_id} alarm`;
    } catch (error) {
      throw new WsException('Failed to delete alarm: ' + error.message);
    }
  }
}
