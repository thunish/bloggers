import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { BindingsType } from "../..";
import zod, { string } from "zod";
import bcrypt from "bcrypt";
import { sign, decode, verify } from "hono/jwt";
import { signupBody } from "@thunish/medium-common";

export const userRouter=new Hono<{Bindings: BindingsType}>();



userRouter.post("/signup", async(c)=>{
    try{
        const body: any=await c.req.json();
        
        const { success }=signupBody.safeParse(body);
        if(!success){
            return c.json({
                msg:"Invalid inputs",
            });
        }

        const dburl=c.env.DATABASE_URL
        const prisma=new PrismaClient({
            datasourceUrl:dburl,
        }).$extends(withAccelerate());
        const theUser=await prisma.user.findUnique({
            where:{
                email:body.email,
            }
        });
        if(theUser){
            return c.json({
                msg:"The user with same email already exists",
            });
        }
        // const salt= bcrypt.genSaltSync(10)
        // const hashedPassword= bcrypt.hashSync(body.password, salt);
        const res=await prisma.user.create({
            data:{
                email:body.email,
                firstName:body.firstName,
                lastName:body.lastName,
                password:body.password,
            }
        });
        const token = await sign({id:res.id, email:res.email}, c.env.JWT_SECRET);
        return c.json({
            msg:'This is good',
            body:token,
        });

        
    }
    catch(err){
        console.error(err);
        return c.json({
            msg:"Error Found",
            error:err,
        });
    }
});

userRouter.post("/signin", async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
    
        if (!user) {
            return c.json({ error: "user not found" }, 403);
        }
    
        const jwt = await sign({ id: user.id, email:user.email }, c.env.JWT_SECRET);
        return c.json({ 
            msg:"Successfull Signin",
            token: jwt
        }, 200);
    }
    catch(err){
        console.log(err);
        return c.json({
            msg:"Error Found",
            error:err,
        });
    }
});


