import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { EnvVariable } from '../config/envVariable';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomUserName implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if(EnvVariable.EMAIL_REGEX.test(text)) return true;
    return text.trim().length>=args.constraints[0] && text.trim().length <=args.constraints[1]
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'username  is invalid';
  }
}