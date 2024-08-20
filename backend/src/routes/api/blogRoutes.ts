import { Hono } from "hono";
import { isMiddleware } from "hono/utils/handler";
import { authenticate } from "../../middlewares/auth";
import { BindingsType, VariablesType } from "../..";
import { Bindings } from "hono/types";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import zod from "zod";
import { PrismaClientExtends } from "@prisma/client/extension";
import { postBody } from "@thunish/medium-common";


export const blogRouter=new Hono<{Bindings:BindingsType, Variables: VariablesType}>();
blogRouter.use("*", authenticate);


blogRouter.post("/validate", async(c)=>{
    try{
        const id=c.get("userId");
        if(id){
            return c.json({
                msg:"Successfull"
            }, 200);
        }
    }
    catch(err){
        console.log(err);
        return c.json({
            msg:"Error Found",
            error:err,
        })
    }
})

blogRouter.post("/", async(c)=>{
    try{
        const id=c.get("userId");
        const body=await c.req.json();
        const {success}=postBody.safeParse(body);
        if(!success){
            return c.json({
                msg:'You have not provided either title or text',
            });
        }
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const thePost=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                imageUrl:body.imageUrl,
                authorId:id,
            }
        });
        return c.json({
            msg:"Successful post creation",
            blog:thePost,
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

blogRouter.put("/", async(c)=>{
    try{    
        const id=c.get("userId");
        const body=await c.req.json();
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const thePost=await prisma.post.update({
            where:{
                authorId:id,
                id:body.id,
            },
            data:{
                title:body.title,
                content:body.content,
            }
        });
        
        return c.json({
            msg:"You have successfully updated it",
            post:thePost,
        });
    }
    catch(err){
        console.error(err);
        return c.json({
            msg:"You are not authorized to update this",
        });
    }
});

blogRouter.get("/:id", async(c)=>{
    try{
        const id=await c.req.param("id");
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const thePost=await prisma.post.findUnique({
            where:{
                id:id,
            },
            select:{
                title:true,
                content:true,
                updatedAt:true,
                author:{
                    select:{
                        firstName:true,
                    }
                },
                createdAt:true,
                imageUrl:true
            }
        });
        return c.json({
            msg:"The blog is found",
            post:thePost,
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

blogRouter.get("/bulk/", async(c)=>{
    try{
        const filter="";
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const posts=await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                updatedAt:true,
                id:true,
                imageUrl:true,
                createdAt:true,
                author:{
                    select:{
                        firstName:true,
                        lastName:true,
                    }
                }
            }
        });
        return c.json({
            msg:'Found the posts',
            posts:posts,
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