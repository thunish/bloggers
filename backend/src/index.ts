import { Hono } from 'hono'
import { rootRouter } from './routes/root'
import { cors } from 'hono/cors';

export interface BindingsType {
    DATABASE_URL: string,
    SaltRounds: number,
    JWT_SECRET: string,
}

export interface VariablesType {
    userId: string,
}

const app = new Hono<{Bindings: BindingsType, Variables: VariablesType}>()
app.use(cors());

app.route("/api/v1", rootRouter);


export default app
