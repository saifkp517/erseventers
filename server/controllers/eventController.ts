import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import Twilio from "twilio/lib/rest/Twilio";
import Razorpay from "razorpay";
import https from "https"
import nodemailer from "nodemailer"
import * as crypto from "crypto"

const prisma = new PrismaClient();


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

///////////////////////get requests////////////////////////////////
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany()

        res.status(200).send(events)

    } catch (err) {
        res.status(400).send(err)
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const eventid = req.params.eventid;

        const event = await prisma.event.findUnique({
            where: {
                eventid: eventid
            }
        })

        res.status(200).send(event)

    } catch (err) {
        res.status(400).send(err)
    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {

        const email = req.params.email;

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        res.status(200).send(user)


    } catch (err) {
        res.status(400).send(err)
    }
}

export const getEventTickets = async (req: Request, res: Response) => {

    try {
        const tickets = await prisma.ticket.findMany({
            where: { eventid: req.params.eventid },
        })

        res.status(200).send(tickets)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export const getEventOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: { eventid: req.params.eventid },
        })

        res.status(200).send(orders)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

///////////////////////get requests////////////////////////////////


///////////////////////post requests////////////////////////////////

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, category, tags, description, date, time, venue, artist, terms } = req.body;

        console.log(req.body);

        const event = await prisma.event.create({
            data: {
                title: title,
                imageLoc: req.file?.filename!,
                category: category,
                tags: tags,
                time: time,
                description: description,
                date: date,
                venue: venue,
                artist: artist,
                terms: terms,
            }
        })

        res.status(201).send(event)

    } catch (err) {
        res.status(400).send(err)
    }
}

export const postImage = async (req: Request, res: Response) => {
    res.send(req.file?.filename);
}


export const createTicket = async (req: Request, res: Response) => {
    try {
        const { eventid, type, price, qty, description, orders } = req.body;

        console.log(req.body)

        const ticket = await prisma.ticket.createMany({
            data: req.body
        })

        res.status(201).send(ticket)
    }
    catch (err) {
        res.status(400).send(err)
    }
}


export const createOrder = async (req: Request, res: Response) => {
    try {
        const { eventid, amt, type, tickets, email, ticketid } = req.body;

        const [order, totalOrders] = await prisma.$transaction([
            prisma.order.create({
                data: {
                    eventid: eventid,
                    type: type,
                    tickets: tickets,
                    amt: amt,
                    organizer: "ERS Eventors",
                    email: email
                }
            }),
            prisma.ticket.update({
                where: { ticketid: ticketid },
                data: { qty: { decrement: tickets } }
            })
        ])

        console.log(totalOrders)
        res.status(201).send(totalOrders)
    }
    catch (err) {
        res.status(400).send(err)
    }
}



export const createOtp = async (req: Request, res: Response) => {

    try {
        const { otp, pageid } = req.body;

        const otpid = await prisma.otp.create({
            data: {
                otp: otp,
                pageid: pageid
            }
        })
        console.log(otpid)
        res.status(201).send(otpid)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp, pageid } = req.body;

        const otpid = await prisma.otp.findFirst({
            where: {
                otp: otp,
                pageid: pageid
            }
        })

        if (otpid) {
            res.status(200).json({ success: true, message: "OTP has been successfully verified" });
        } else {
            res.status(400).json({ success: false, message: "OTP could not be verified" });
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phoneno } = req.body;

        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                phoneno: phoneno
            }
        })

        res.status(200).send(user);

    }
    catch (err) {
        res.status(400).send(err)
    }
}

export const razorpayOrder = async (req: Request, res: Response) => {
    try {

        const { amt } = req.body;

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_DEV_KEY_ID!,
            key_secret: process.env.RAZORPAY_DEV_SECRET!,
        });

        const options = {
            amount: Number(amt) * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_3423`,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const razorpayConfirmation = async (req: Request, res: Response) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_DEV_SECRET!);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const sendOTP = async (req: Request, res: Response) => {

    try {

        const { otp, email } = req.body;

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

        return res.json({ success: true, message: "your email has been sent" })

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "There has been an error encountered" })
    }

}

export const sendTicketMail = async (req: Request, res: Response) => {
    try {
        const { otp, email } = req.body;

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

        return res.json({ success: true, message: "your email has been sent" })
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "There has been an error encountered" })
    }
}

// export const sendWhatsappMsg = async (req: Request, res: Response) => {

//     // Download the helper library from https://www.twilio.com/docs/node/install
//     // Find your Account SID and Auth Token at twilio.com/console
//     // and set the environment variables. See http://twil.io/secure
//     const accountSid;
//     const authToken;



//     const client = new Twilio(accountSid, authToken);

//     console.log('yes')

//     client.messages
//         .create({
//             from: 'whatsapp:+16413545414',
//             body: 'Your appointment is coming up on July 21 at 3PM',
//             to: 'whatsapp:+919148654500'
//         })
//         .then((message: any) => console.log("sent"))
//         .catch((err: Error) => console.log(err))
// }

///////////////////////post requests////////////////////////////////
