import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/Schema/user.schema';
import { Alarm, AlarmSchema } from 'src/Schema/alarm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
