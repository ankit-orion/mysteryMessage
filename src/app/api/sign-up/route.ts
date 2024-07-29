import dbConnect from "@/lib/dbConnect"; 
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(request: Request){
    await dbConnect();
    try {
        const {username, email, password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username already exists"
            }, {status: 400})
        }
        // here we are checking if the email already exists or not if not then we are registering the4 user into our database
        // we habe to hash the passowrd before storing it in the database for securtiy purposes
        // for hasing we are using bcrypt library
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existingUserByEmail = await UserModel.findOne({email})
        if(existingUserByEmail){
            return Response.json({
                success: false,
                message: "Email already exists"
            }, {status: 400})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            // here expiryDate is an object of Date class which is used to set the expiry date of the verification code
            // but you muight be wondering how we can change the value if it is a constant
            // well, we can change the value of the object but we cannot change the reference of the object
            // so here we are changing the value of the object

            const expirytDate = new Date();
            // here we are setting the expiry date of the verification code to 1 hour from the current time
            expirytDate.setHours(expirytDate.getHours() + 1);
            new UserModel({
                username,
                email,
                password: hashedPassword,

            })
        }
    } catch (error) {
        console.log("Error Registering user", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        },
    {
        status: 500
    })
    }
}