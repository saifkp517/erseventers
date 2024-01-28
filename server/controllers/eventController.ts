import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import Twilio from "twilio/lib/rest/Twilio";
import Razorpay from "razorpay";
import https from "https"
import * as crypto from "crypto"

const prisma = new PrismaClient();

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
        const { ticketid, amt, tickets, type, email} = req.body;

        const order = await prisma.order.create({
            data: {
                ticketid: ticketid,
                type: type,
                tickets: tickets,
                amt: amt,
                organizer: "ERS Eventors",
                email: email
            }
        })

        res.status(201).send(order)
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
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_SECRET!,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
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
        const shasum = crypto.createHmac("sha256", "NBhtTzAHSuAhlLswSANPqEOe");

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
