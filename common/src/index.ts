import zod from "zod";

export const signupBody=zod.object({
    email:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
});

export type SignupBody=zod.infer<typeof signupBody>;


export const postBody=zod.object({
    title:zod.string(),
    content:zod.string(),
});

export type PostBody=zod.infer<typeof postBody>;