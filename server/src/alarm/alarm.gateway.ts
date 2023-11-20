import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { ValidationPipe } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class AlarmGateway {
  constructor(private readonly alarmService: AlarmService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, ' connected');
    });
  }

  @SubscribeMessage('createAlarm')
  async create(
    @MessageBody(new ValidationPipe({ transform: true }))
    createAlarmDto: CreateAlarmDto,
  ) {
    try {
      const newAlarm = await this.alarmService.create(
        createAlarmDto,
        this.server,
      );
      console.log(newAlarm);
      if (!newAlarm) {
        return {
          status: 'error',
          message: 'Failed to create alarm',
        };
      }
      return newAlarm;
    } catch (error) {
      throw new WsException('Failed to create alarm: ' + error.message);
    }
  }

  @SubscribeMessage('findAllAlarm')
  async findAll(@MessageBody() user_id: string) {
    console.log(user_id)
    return await this.alarmService.findAll(user_id);
  }

  // @SubscribeMessage('findOneAlarm')
  // findOne(@MessageBody() id: number) {
  //   return this.alarmService.findOne(id);
  // }

  // @SubscribeMessage('updateAlarm')
  // update(@MessageBody() updateAlarmDto: UpdateAlarmDto) {
  //   return this.alarmService.update(updateAlarmDto.id, updateAlarmDto);
  // }

  @SubscribeMessage('removeAlarm')
  remove(@MessageBody() alarm_id: string) {
    return this.alarmService.remove(alarm_id);
  }
}
