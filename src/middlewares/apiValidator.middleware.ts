import { BadRequestError } from '@manoj19-github/microservice_shared_lib';
import { sanitize } from 'class-sanitizer';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const payloadValidator =
	(type: any, skipMissingProperties: boolean = false, whitelist = true, forbidNonWhitelisted = true) =>
	(req: Request, res: Response, next: NextFunction) => {
		const dtoObject = plainToInstance(type, req.body);
		validate(dtoObject, { skipMissingProperties, whitelist, forbidNonWhitelisted })
			.then((errors: ValidationError[]) => {
				if (errors.length > 0) {
					return res.status(StatusCodes.BAD_REQUEST).json({ message: JSON.stringify(errors), title: 'invalid input' });
				} else {
					sanitize(dtoObject);
					req.body = dtoObject;

					next();
				}
			})
			.catch((errors: any) => {
				return new BadRequestError('invalid input', JSON.stringify(errors));
				// return new HttpException(400, JSON.stringify(errors));
			});
	};
export default payloadValidator;
