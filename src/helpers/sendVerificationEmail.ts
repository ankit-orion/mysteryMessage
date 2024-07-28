import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username: string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.com',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: "Verification email sent"};
        
    } catch (emailEroor) {
        console.log("Error sending verification email", emailEroor);
        return{success: false, message:"Error sending verification email"};
    }
}