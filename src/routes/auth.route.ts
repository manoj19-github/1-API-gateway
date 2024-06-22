import { verifyGatewayRequest } from '@manoj19-github/microservice_shared_lib';
import { AuthController } from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';
import { EmailDTO, SignupDTO } from '../dtos/signup.dtos';
import DTOValidationMiddleware from '../middlewares/apiValidator.middleware';
import { ResetPasswordDTO, changePasswordDTO, loginDTO } from '../dtos/signin.dto';

export class AuthRoutes implements Routes {
	path = '/auth';
	router: Router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/signup`, DTOValidationMiddleware(SignupDTO), AuthController.signup);
		this.router.post(`${this.path}/signin`, DTOValidationMiddleware(loginDTO), AuthController.signin);
		this.router.put(`${this.path}/verify-email`, AuthController.verifyEmail);
		this.router.put(`${this.path}/forgot-password`, DTOValidationMiddleware(EmailDTO), AuthController.forgotPassword);
		this.router.put(`${this.path}/reset-password/:token`, DTOValidationMiddleware(ResetPasswordDTO), AuthController.resetPassword);
		this.router.put(`${this.path}/change-password`, DTOValidationMiddleware(changePasswordDTO), AuthController.changePassword);
	}
}
