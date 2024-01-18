import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import PaytmChecksum from "./PaytmChecksum";
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

export const getEventTickets = async (req: Request, res: Response) => {
    try {
        const events = await prisma.ticket.findMany({
            where: { eventid: req.params.eventid },
        })

        res.status(200).send(events)
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

        const ticket = await prisma.ticket.create({
            data: {
                eventid: eventid,
                type: type,
                price: price,
                qty: qty,
                description: description,
            }
        })

        res.status(201).send(ticket)
    }
    catch (err) {
        res.status(400).send(err)
    }
}


export const createOrder = async (req: Request, res: Response) => {
    try {
        const { ticketid, amt, organizer, name, mail, phoneno } = req.body;

        const order = await prisma.order.create({
            data: {
                ticketid: ticketid,
                name: name,
                mail: mail,
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


export const PaytmPayment = async (req: Request, res: Response) => {

    type PaytmParams = {
        body?: Object;
        head?: Object;
    }

    var paytmParams: PaytmParams = {};

    paytmParams.body = {
        "requestType": "Payment",
        "mid": "zmlHQa48080046451200",
        "websiteName": "WEBSTAGING",
        "orderId": "ORDERID_98765",
        "callbackUrl": "http://localhost:3000/",
        "txnAmount": {
            "value": "1.00",
            "currency": "INR",
        },
        "userInfo": {
            "custId": "CUST_001",
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "aiEcLOKaZufi@rqU").then(function (checksum) {

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: '/theia/api/v1/initiateTransaction?mid=zmlHQa48080046451200&orderId=ORDERID_98765',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end', function () {
                console.log('Response: ', response);
            });
        });

        post_req.write(post_data);
        post_req.end();
    });

}

///////////////////////post requests////////////////////////////////
