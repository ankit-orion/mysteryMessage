import z from 'zod';
export const messageSchema = z.object({
    content : z.string()
    .min(10, "message must be atleast 10 characters")
    .max(300, "content cannot exceed 300 characters")
})