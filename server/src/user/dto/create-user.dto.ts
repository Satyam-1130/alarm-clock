import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
