import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    name?: string;
}

