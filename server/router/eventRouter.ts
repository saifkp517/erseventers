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
eventRouter.post('/create-user', eventController.createUser)
eventRouter.post('/order/post', eventController.createOrder);
eventRouter.post('/ticket/create', eventController.createTicket);
eventRouter.post('/create',upload.single('file'), eventController.createEvent);
//eventRouter.post('/sendmsg', eventController.sendWhatsappMsg)
eventRouter.post('/create-otp', eventController.createOtp)
eventRouter.post('/verify-otp', eventController.verifyOtp)
eventRouter.post('/razorpay-payment', eventController.razorpayOrder)
eventRouter.post('/razorpay-success', eventController.razorpayConfirmation)
eventRouter.post('/sendOTP', eventController.sendOTP)

//get requests
eventRouter.get('/tickets/:eventid', eventController.getEventTickets)
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/orders/:eventid', eventController.getEventOrders);
eventRouter.get('/:eventid', eventController.getEventById);
eventRouter.get('/get-user/:email', eventController.getUserByEmail)

