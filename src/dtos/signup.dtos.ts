import { Trim } from 'class-sanitizer';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator';

export class SignupDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(12)
	@MinLength(4)
    username:string|undefined;
	@IsString()
    @IsNotEmpty()
    @MaxLength(12)
	@MinLength(4)
    password:string|undefined;
	@IsString()
    @IsNotEmpty()
    country:string|undefined;
	@IsEmail({}, { message: 'Provided Email is not valid' })
	@IsNotEmpty()
	@Trim()
	email: string | undefined;
	@IsString()
    @IsNotEmpty()
	profilePicture:string | undefined;
}

export class EmailDTO{
	@IsEmail({}, { message: 'Provided Email is not valid' })
	@IsNotEmpty()
	@Trim()
	email: string | undefined;

}

//@Validate(CustomTextLength, {
//     message: 'Title is too short or long!',
//   })