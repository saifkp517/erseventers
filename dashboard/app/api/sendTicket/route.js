import nodemailer from "nodemailer";
import {NextResponse} from "next/server";
var QRCode = require('qrcode')

export async function POST(req, res) {
    try {
        const { otp, email } = await req.json();
        
        console.log("Your email is being processed...")

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Sending mail through SMTP",
            html: `
                <h1>ERS Eventers Verification!</h1><br />
                <p>Thank you for registering to the ERS Events Dashboad!, please enter the OTP below to get verified</p><br/>
                <h4><b>OTP:  ${otp}</b></h4>
            `
        }

        //send the mail
        const info = await transporter.sendMail(mailOptions)

        console.log("Email sent: ", info.response)

        return NextResponse.json({success: true, message: "your email has been sent"})
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({success: false, message: "ain't workin"})
    }
}