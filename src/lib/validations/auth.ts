import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
});

export const signupSchema = loginSchema.extend({ confirmPassword: z.string() }).refine((d) => d.password === d.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;