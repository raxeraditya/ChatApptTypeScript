import { z } from "zod";
const SignupSchemaZod = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "You can make sure to match password"),
    profilePhoto: z.string(),
    gender: z.string(),
});
const LoginSchemaZod = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
export { SignupSchemaZod, LoginSchemaZod };
