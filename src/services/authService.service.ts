import axios, { AxiosResponse } from "axios";
import { AxiosService } from "../config/axios.config";
import { EnvVariable } from "../config/envVariable";
import { IAuth } from "@manoj19-github/microservice_shared";


export class AuthService{
    public static axiosService:AxiosService = new AxiosService(`${EnvVariable.AUTH_BASE_URL}/api/v1/auth`,`auth`);
    public static axiosAuthInstance = AuthService.axiosService.axios;
    public static async getCurrentUser():Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.get(`/currentuser`);  
    }
    public static async getRefreshToken(username:string):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.get(`/refresh-token/${username}`);  
    }
    public static async changePassword({currentPassword,newPassword}:{currentPassword:string,newPassword:string}):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.put(`/change-password`,{currentPassword,newPassword});  
    }
    public static async signup(body:IAuth):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.post(`/signup`,body);  
    }
    public static async signin(body:IAuth):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.post(`/signin`,body);  
    }
    public static async resendEmail({userId,email}:{userId:string,email:string}):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.post(`/resend-email`,{userId,email});  
    }
    public static async forgotPassword(email:string):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.put(`/forgot-password`,{email});  
    }
    public static async resetPassword({token,password,confirmPassword}:{token:string,password:string,confirmPassword:string}):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.put(`/reset-password/${token}`,{password,confirmPassword});  
    }
    public static async getGigs({query,from,size,type}:{query:string,from:string,size:string,type:string}):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.get(`/search/gig/${from}/${size}/${type}?q=${query}`);  
    }
    public static async getGig(gigId:string):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.get(`/search/gig/${gigId}`);  
    }
    public static async seed(count:string):Promise<AxiosResponse>{
        return await AuthService.axiosAuthInstance.get(`/seed/${count}`);  
    }
}