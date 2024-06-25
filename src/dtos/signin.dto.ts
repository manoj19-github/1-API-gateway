import { IsNotEmpty, Matches, IsString, MaxLength, MinLength, Validate, IsEmail } from 'class-validator';
import { CustomUserName } from '../utils';
import { Trim } from 'class-sanitizer';
export class loginDTO {
	@Validate(CustomUserName, [3, 20], {
		message: 'username is invalid'
	})
	username: string | undefined;
	@IsString()
	@MaxLength(12)
	@MinLength(4)
	@IsNotEmpty()
	password: string | undefined;
}
export class ResetPasswordDTO {
	@IsString()
	@MaxLength(12)
	@MinLength(4)
	@IsNotEmpty()
	password: string | undefined;
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches('password')
	confirmPassword: string | undefined;
}

export class changePasswordDTO {
	@IsString()
	@MaxLength(12)
	@MinLength(4)
	@IsNotEmpty()
	currentPassword: string | undefined;
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches('currentPassword')
	newPassword: string | undefined;
}

export class ResendEmailDTO {
	@IsString()
	@IsNotEmpty()
	userId?: string | undefined;
	@IsEmail({}, { message: 'Provided Email is not valid' })
	@IsNotEmpty()
	@Trim()
	email: string | undefined;
}
