import {z} from 'zod';
// here  we are having only one validation so we can directly use z.string() instead of creating object
// object is used when we have multiple validation
export const usernameValidation = z
    .string()
    .min(2, "username myst be atleast 2 characters")
    .max(20, "username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "username can only contain letters, numbers and underscores")

// here we are creating object because we have multiple validation like email and username validation
export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email"}), // here we are using email validation
    password: z.string().min(6, {message: "password must be atleast 6 characters"}), // here we are using min validation    
})