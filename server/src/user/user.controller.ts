/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser( @Res() response: Response, @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto) {
    const userData =  await this.userService.createUser(createUserDto)

    if (!userData) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response.status(HttpStatus.CREATED).json({
      message: 'User Created Successfully!',
      userData:userData,
    });
  }

  @Post('signin')
  async createSession( @Res() response: Response, @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto) {
    const userData =  await this.userService.createSession(createUserDto)

    if (!userData.user) {
      throw new HttpException(
        'Credentials not matched',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return response.status(HttpStatus.CREATED).json({
      message: 'User Signed in Successfully!',
      userData:userData.user,
      alarmData:userData.alarm
    });
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
