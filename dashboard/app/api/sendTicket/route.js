import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
var QRCode = require('qrcode')

export async function POST(req, res) {
    try {
        const { orders, eventname, userdata } = await req.json();

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

        let total = 0;

        orders.forEach(num => {
            total += num.amt
        });

        // <h1>ERS Eventers</h1><br />
        // <img src="https://ibb.co/3WRVcnH" alt="asdad" />
        // <h3>Hey ${userdata.name}!</h3><br />
        // <h4>Wow! Thank you for choosing us and purchasing tickets for ${eventname}. We're genuinely excited to have you on board! </h4><br/>
        // <br />
        // <h3>Ticket Details</h3><br />
        // ${orders.map(order => (
        //     `<p>Ticket Type: ${order.type} - ${order.tickets} Ticket Purchased </p><br />`
        // ))}
        // <h4>Total:₹ ${total} </h4>
''
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userdata.email,
            subject: "Thank You for Your Ticket Purchase!",
            html: `
            <html>
            <head>
                <script src="//cdn.tailwindcss.com"></script>
            </head>
            <body class="flex items-center justify-center">
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-5 ">
            <div class="flex flex-col items-center pb-10">
                <a href="https://ibb.co/3WRVcnH"><img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://i.ibb.co/3WRVcnH/ers-removebg-preview.png" alt="ers-removebg-preview" border="0"></a>
                <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Hey ${userdata.name}!</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Wow! Thank you for choosing us and purchasing tickets for ${eventname}. We're genuinely excited to have you on board! </span><br />
                <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white" >Ticket Details</h3><br />
                ${orders.map(order => (
                    `<p>Ticket Type: ${order.type} - ${order.tickets} Ticket Purchased </p>`
                ))}
                <h4 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Total:₹ ${total} </h4>
            </div>
            </div>
            </body>
            </html>
            


            `
        }

        //send the mail
        const info = await transporter.sendMail(mailOptions)

        console.log("Email sent: ", info.response)

        return NextResponse.json({ success: true, message: "your email has been sent" })

    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ success: false, message: "ain't workin" })
    }
}