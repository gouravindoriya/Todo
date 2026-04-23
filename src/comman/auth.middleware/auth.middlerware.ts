import {verifyAccessToken} from '../utils/jwt.utils.js'
import type { Response,Request,NextFunction } from "express";
import ApiErrorResponse from '../utils/api.errors.response.js';


export const isauthenticated=(req:Request,res:Response,next:NextFunction)=>{
    try {
        // console.log(req)
     const token:string|undefined=req.headers.authorization?.split(" ")[1]
     
    if(!token)return ApiErrorResponse.badRequest(res,"jwt token is missing")
    const data=verifyAccessToken(token)
    if(!data)return ApiErrorResponse.unauthorized(res,"jwt toekn is not verified")

    req.body = { ...req.body, user: data }

    next(); 
    } catch (error) {
        return ApiErrorResponse.unauthorized(res,"token maye be expired")
    }
}