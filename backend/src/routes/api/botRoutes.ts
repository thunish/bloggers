import { Hono } from "hono";
import { BindingsType } from "../..";
import { Bindings } from "hono/types";


export const botRouter=new Hono<{Bindings:BindingsType}>();

botRouter.post("/chat", async(c)=>{
    try{
        const body: any = await c.req.json();
        const {query}=body;
        
    }
    catch(err){
        console.log(err);
        return c.json({
            msg:"Error Found",
            error:err
        })
    }
})