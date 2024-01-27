
"use client"

import React, { useState } from "react";
import EventForm from "@/app/ui/dashboard/form/DetailsForm";
import TicketForm from "@/app/ui/dashboard/form/TicketForm";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Event = () => {

    const [image, setImage] = useState({ preview: '', data: '' })
    const [tickets, setTickets] = useState<any>([])
    const [checked, setChecked] = useState(false)

    const [submitted, setSubmitted] = useState(true)

    const [state, setState] = useState({
        title: "",
        category: "",
        tags: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        artist: "",
        terms: ""
    });

    const [ticket, setTicket] = useState({
        eventid: "",
        type: "",
        price: 0,
        qty: 0,
        description: ""
    })

    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = event.target;

        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    }

    const createEvent = () => {

        console.log(tickets);

        let formData = new FormData()

        formData.append('file', image.data)
        formData.append('title', state.title)
        formData.append('category', state.category)
        formData.append('tags', state.tags)
        formData.append('time', state.time)
        formData.append('description', state.description)
        formData.append('date', state.date)
        formData.append('venue', state.venue)
        formData.append('artist', state.artist)
        formData.append('terms', state.terms)

        axios.post('http://localhost:8080/event/create', formData)
            .then(res => {
                tickets.map((ticket: any) => ticket.eventid = res.data.eventid)

                axios.post('http://localhost:8080/event/ticket/create', tickets)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                setSubmitted(false)
                console.log(err)
            })
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {

        setChecked(true)

        let validated = Object.values(state).every((e: string) => e !== "");

        if (!validated) {
            toast("Please Enter all the required fields");
        }
        else if (tickets.length == 0 && activeStep == 1) {
            toast('Please save all your ticket details!')
        }
        else {
            if (activeStep == 1) {
                createEvent();
            }
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const displayTicketForm = () => {

        const handleInputChange = (event: any) => {
            const { name, value, type } = event.target;
            setTicket((prevProps) => ({
                ...prevProps,
                [name]: type == "number" ? Number(value) : value
            }));
        }

        const submitHandler = (event: React.FormEvent) => {
            event.preventDefault();
            let filled = Object.values(state).every((e: String | number) => e !== undefined);
            if (filled) {
                tickets.push(ticket);
                setTickets([...tickets])
                toast(`ticket details saved!`)
            }
            else {
                toast("fill all the details")
            }

            setTicket({
                eventid: "",
                type: "",
                price: 0,
                qty: 0,
                description: ""
            })
        }

        return <TicketForm
            ticket={ticket}
            handleInputChange={handleInputChange}
            submitHandler={submitHandler} />
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <
                    EventForm
                    state={state}
                    image={image}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    checked={checked}
                />;
            case 1:
                return (
                    <div className="mx-auto max-w-3xl">
                        <Typography className=" my-10 text-center text-textSoft" variant="h3">Ticket Details</Typography>
                        {displayTicketForm()}
                        {
                            tickets.map((ticket: any) => (<p>{ticket.type}</p>))
                        }
                    </div>
                )
            case 2:
                return (
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Unfortunately we were Unable to Proceed
                        </Typography>
                        <Typography variant="subtitle1">
                            Our servers are down currently!, please try again after a while
                        </Typography>
                    </div>
                )
            default:
                throw new Error('Unknown step');
        }
    }


    return (
        <div>
            {activeStep === 2 && submitted == true ? (
                <div className=" mt-28 mx-auto max-w-3l">
                    <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                    </Typography>

                </div>
            )
                :
                submitted == false ? (
                    <div className=" mt-28 mx-auto max-w-3xl">
                        {getStepContent(activeStep)}

                        {activeStep === 2 && (
                            <Button className="mx-auto" onClick={() => window.location.reload()} sx={{ mt: 3, ml: 1 }}>
                                Back
                            </Button>
                        )}
                    </div>
                )
                    :
                    (
                        <div>
                            {getStepContent(activeStep)}

                            <div className="flex max-w-3xl mx-auto">
                                {activeStep !== 0 && (
                                    <Button className="mx-auto" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    className="mx-auto bg-bgSoft"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === 1 ? 'List Event' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )
            }
            <ToastContainer
                position="bottom-left"
                theme="dark"
            />
        </div >
    );
}

export default Event;