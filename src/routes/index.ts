import { Routes } from '../interfaces/routes.interface';
import { Application, Router } from 'express';
import { AuthRoutes } from './auth.route';

class RoutesMain  {
	private routes: Routes[] = [new AuthRoutes()]; // add all routes  here
	private path=`/api/gateway/v1`
	constructor() {}
	public initializeAllRoutes(app: Application) {
		this.routes.forEach((route) => {
			app.use(`${this.path}`, route.router);
		});
	}
}

export default RoutesMain;
