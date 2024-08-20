import { Hono } from "hono";
import { BindingsType } from "../..";
import { Bindings } from "hono/types";
import {GoogleGenerativeAI} from "@google/generative-ai";



export const botRouter=new Hono<{Bindings:BindingsType}>();
const API_KEY: any="AIzaSyD_3_DrCC2ux2QrsLEw6cbysMgdZ6-OD40";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

botRouter.post("/chat", async(c)=>{
    try{
        const body: any = await c.req.json();
        const {query}=body;
        const response=await run(query);
        return c.json({
            msg:"This is good",
            response:response,
        })
    }
    catch(err){
        console.log(err);
        return c.json({
            msg:"Error Found",
            error:err
        })
    }
});

async function run(query: string) {
    const prompt = query;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}
  