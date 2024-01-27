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
eventRouter.post('/sendmsg', eventController.sendWhatsappMsg)
eventRouter.post('/create-otp', eventController.createOtp)
eventRouter.post('/verify-otp', eventController.verifyOtp)

//get requests
eventRouter.get('/tickets/:eventid', eventController.getEventTickets)
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:eventid', eventController.getEventById);

