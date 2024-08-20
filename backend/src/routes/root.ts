import { Hono } from "hono";
import { userRouter } from "./api/userRoutes";
import { blogRouter } from "./api/blogRoutes";
import { botRouter } from "./api/botRoutes";


export const rootRouter=new Hono();

rootRouter.route("/user", userRouter);
rootRouter.route("/blog", blogRouter);
rootRouter.route("/bot", botRouter);
