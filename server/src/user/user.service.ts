import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schema/user.schema';
import { Model } from 'mongoose';
import { Alarm } from 'src/Schema/alarm.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(Alarm.name)
    private readonly AlarmModel: Model<Alarm>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.UserModel.create(createUserDto);
      return newUser;
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createSession(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    try {
      const user = await this.UserModel.findOne({ email });
      const user_id = user._id;
      const alarm = await this.AlarmModel.find({ user_id });
      console.log(user,alarm)
      return { user, alarm };
    } catch (err) {
      throw new HttpException(
        'Credentials not matched',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
