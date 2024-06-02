import { Request,Response,NextFunction } from "express";
import { AuthService } from "../services/authService.service";
import { AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";

export class AuthController{
    public static async create(request:Request,response:Response,next:NextFunction):Promise<void>{
        try{
            const axiosResponse:AxiosResponse = await AuthService.signup(request.body)
            request.session = {jwt:axiosResponse.data.token};
            response.status(StatusCodes.CREATED).json({message:axiosResponse.data.message,user:axiosResponse.data.user})


        }catch(error){
            console.log('auth controller create method: ', error);
            next(error)
        }


    }
}