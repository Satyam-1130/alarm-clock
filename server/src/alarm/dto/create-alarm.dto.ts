import { IsNotEmpty, IsString } from "class-validator"

export class CreateAlarmDto {
    @IsNotEmpty()
    @IsString()
    alarm_time:string

    @IsNotEmpty()
    @IsString()
    user_id:string
}
