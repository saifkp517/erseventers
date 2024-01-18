import { Router } from "express";
import * as eventController from "../controllers/eventController";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })

export const eventRouter = Router();

//post requests
eventRouter.post('/order/post', eventController.createOrder);
eventRouter.post('/ticket/create', eventController.createTicket);
eventRouter.post('/create',upload.single('file'), eventController.createEvent);
eventRouter.post('/payment', eventController.PaytmPayment)

//get requests
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/tickets', eventController.getEventTickets)
