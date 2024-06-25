import { verifyGatewayRequest } from '@manoj19-github/microservice_shared_lib';
import { AuthController } from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';
import { EmailDTO, SignupDTO } from '../dtos/signup.dtos';
import payloadValidator from '../middlewares/apiValidator.middleware';
import { ResendEmailDTO, ResetPasswordDTO, changePasswordDTO, loginDTO } from '../dtos/signin.dto';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export class AuthRoutes implements Routes {
	path = '/auth';
	router: Router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/signup`, payloadValidator(SignupDTO), AuthController.signup);
		this.router.post(`${this.path}/signin`, payloadValidator(loginDTO), AuthController.signin);
		this.router.put(`${this.path}/verify-email`, AuthController.verifyEmail);
		this.router.put(`${this.path}/forgot-password`, payloadValidator(EmailDTO), AuthController.forgotPassword);
		this.router.put(`${this.path}/reset-password/:token`, payloadValidator(ResetPasswordDTO), AuthController.resetPassword);
		this.router.put(
			`${this.path}/change-password`,
			payloadValidator(changePasswordDTO),
			AuthMiddleware.verifyUser,
			AuthController.changePassword
		);
		this.router.put(
			`${this.path}/change-password`,
			payloadValidator(changePasswordDTO),
			AuthMiddleware.verifyUser,
			AuthController.changePassword
		);
		this.router.get(`${this.path}/current-user`, AuthController.getCurrentUser);
		this.router.put(`${this.path}/resend-email`, payloadValidator(ResendEmailDTO), AuthController.resendEmail);
	}
}
