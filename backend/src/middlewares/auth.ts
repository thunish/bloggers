import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";


export const authenticate = async(c: Context, next: Next)=>{
    const token: string | undefined=c.req.header('Authorization');
    const jwt: string | undefined=token?.split(" ")[1];
    if (!jwt) {
        return c.text('You are not logged in ', 401);  
    }
    try{
        const payload: string | JWTPayload=await verify(jwt, c.env.JWT_SECRET);
        if(!payload){
            return c.json({
                msg:"You are not logged in ",
            }, 403);
        }
        c.set("userId", payload.id);
        await next();
    }
    catch(err){
        console.log(err);
        return c.json({
            msg:"You are not logged in "
        }, 403);
    }
    
}