import { BadRequestError } from '@manoj19-github/microservice_shared';
import { sanitize } from 'class-sanitizer';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

const DTOValidationMiddleware =
	(type: any, skipMissingProperties: boolean = false) =>
	(req: Request, res: Response, next: NextFunction) => {
		const dtoObject = plainToInstance(type, req.body);
		validate(dtoObject, { skipMissingProperties })
			.then((errors: ValidationError[]) => {
				if (errors.length > 0) {
                    return new BadRequestError("invalid input",JSON.stringify(errors));
				} else {
					sanitize(dtoObject);
					req.body = dtoObject;
					next();
				}
			})
			.catch((errors:any) => {
				console.log('errors:', errors);
                return new BadRequestError("invalid input",JSON.stringify(errors));
				// return new HttpException(400, JSON.stringify(errors));
			});
	};
export default DTOValidationMiddleware;