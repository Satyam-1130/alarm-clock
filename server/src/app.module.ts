import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './alarm/alarm.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/alarm-clock'),AlarmModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
