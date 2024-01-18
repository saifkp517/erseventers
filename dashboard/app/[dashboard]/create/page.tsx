
"use client"

import React, { useState } from "react";
import EventForm from "@/app/ui/dashboard/form/DetailsForm";
import TicketForm from "@/app/ui/dashboard/form/TicketForm";
import { Button, Typography } from "@mui/material";
import axios from "axios";


const Event = () => {


    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

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
    })

    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
        console.log(img.data);
    }


    const [ticketState, setTicketState] = useState({
        eventid: "",
        type: "",
        price: 0,
        qty: 0,
        description: ""
    })

    const handleInputChange = (event: any) => {
        console.log(state)
        const { name, value } = event.target;

        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    }

    const handleTicketInputChange = (event: any) => {
        const { name, value, type } = event.target;
        setTicketState((prevProps) => ({
            ...prevProps,
            [name]: type == "number" ? Number(value) : value
        }));
    }

    const saveTicket = () => {
        console.log(state);

        axios.post('http://localhost:8080/event/ticket/create', ticketState)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    const createEvent = () => {

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
                ticketState.eventid = res.data.eventid
                saveTicket();
            })
            .catch(err => {
                setSubmitted(false)
            })
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {

        let validated = Object.values(state).every((e: string) => e !== "");

        if (!validated) {
            alert('bruh')
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

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <
                    EventForm
                    state={state}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                />;
            case 1:
                return <
                    TicketForm
                    state={ticketState}
                    handleInputChange={handleTicketInputChange}
                />;
            case 2:
                return (
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Unfortunately we were Unable to Proceed
                        </Typography>
                        <Typography variant="subtitle1">
                            Please try submitting again by filling up all the forms or ensure the ticket details have been filled correctly
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
                        {getStepContent(2)}
                        <Button className="mx-auto" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Back
                        </Button>
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
        </div >
    );
}

export default Event;