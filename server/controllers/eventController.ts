import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import Twilio from "twilio/lib/rest/Twilio";
import https from "https"


const PAYTM_MERCHANT_KEY = 'aiEcLOKaZufi@rqU';
const PAYTM_MID = 'zmlHQa48080046451200';
const PAYTM_WEBSITE = 'WEBSTAGING';

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
        const { ticketid, amt, organizer, name, email, phoneno, tickets } = req.body;

        const order = await prisma.order.create({
            data: {
                ticketid: ticketid,
                name: name,
                email: email,
                tickets: tickets,
                phoneno: phoneno,
                amt: amt,
                organizer: organizer,
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


export const sendWhatsappMsg = async (req: Request, res: Response) => {

    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = 'AC538a43d3109a03d219b8bb1fee778af4';
    const authToken = '582b490fbf134b97e3ba82c044b9c0d7';



    const client = new Twilio(accountSid, authToken);

    console.log('yes')

    client.messages
        .create({
            from: 'whatsapp:+16413545414',
            body: 'Your appointment is coming up on July 21 at 3PM',
            to: 'whatsapp:+919148654500'
        })
        .then((message: any) => console.log("sent"))
        .catch((err: Error) => console.log(err))
}

///////////////////////post requests////////////////////////////////
