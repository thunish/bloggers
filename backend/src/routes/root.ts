import { Hono } from "hono";
import { userRouter } from "./api/userRoutes";
import { blogRouter } from "./api/blogRoutes";


export const rootRouter=new Hono();

rootRouter.route("/user", userRouter);
rootRouter.route("/blog", blogRouter);
