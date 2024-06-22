import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '@manoj19-github/microservice_shared_lib';

export class AuthController {
	public static async signup(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const axiosResponse: AxiosResponse = await AuthService.signup(request.body);
			request.session = { jwt: axiosResponse.data.token };
			response.status(StatusCodes.CREATED).json({ message: axiosResponse.data.message, user: axiosResponse.data.user });
		} catch (error) {
			console.log('auth controller signup method: ', error);
			next(error);
		}
	}
	public static async signin(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const axiosResponse: AxiosResponse = await AuthService.signin(request.body);
			request.session = { jwt: axiosResponse.data.token };
			response.status(StatusCodes.CREATED).json({ message: axiosResponse.data.message, user: axiosResponse.data.user });
		} catch (error) {
			console.log('auth controller create method: ', error);
			next(error);
		}
	}
	public static async verifyEmail(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const axiosResponse: AxiosResponse = await AuthService.verifyEmail(request.body.token);
			response.status(StatusCodes.OK).json({ message: axiosResponse.data.message, user: axiosResponse.data.user });
		} catch (error) {
			console.log('auth controller create method: ', error);
			next(error);
		}
	}
	public static async forgotPassword(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const axiosResponse: AxiosResponse = await AuthService.forgotPassword(request.body.email);
			response.status(StatusCodes.OK).json({ message: axiosResponse.data.message, user: axiosResponse.data.user });
		} catch (error) {
			next(error);
		}
	}
	public static async resetPassword(request: Request, response: Response, next: NextFunction) {
		try {
			const { password, confirmPassword } = request.body;
			const result: AxiosResponse = await AuthService.resetPassword({ token: request.params.token, password, confirmPassword });
			return response.status(StatusCodes.OK).json({
				message: result.data.message
			});
		} catch (error) {
			next(error);
		}
	}
	public static async changePassword(request: Request, response: Response, next: NextFunction) {
		try {
			const { currentPassword, newPassword } = request.body;
			const result: AxiosResponse = await AuthService.changePassword({ currentPassword, newPassword });
			return response.status(StatusCodes.OK).json({
				message: result.data.message
			});
		} catch (error) {
			next(error);
		}
	}
}
