import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description:'Users lastname',
        type: String
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description:'Users fisrtname',
        type: String
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'email',
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description:'username',
        type: String
    })
    @IsString()
    username: string;

    @ApiProperty({
        description:'Phone Number',
        type: String
    })
    @IsString()
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty({
        description:'Profile picture',
        type: String
    })
    @IsString()
    @IsOptional()
    profilePicture: string

    @ApiProperty({
        description:'bio description',
        type: String
    })
    @IsString()
    @IsOptional()
    bio: string
}

