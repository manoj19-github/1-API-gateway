import { verifyGatewayRequest } from '@manoj19-github/microservice_shared';
import { AuthController } from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';

export class AuthRoutes implements Routes {
	path = '/auth';
	router: Router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/signup`, AuthController.create);
	}
}
