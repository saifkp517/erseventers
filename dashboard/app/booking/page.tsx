'use client'

import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {

    const params = useSearchParams();
    const [tickets, setTickets] = useState<any>([]);
    const eventid = params.get('eventid')

    useEffect(() => {

        axios.get(`http://localhost:8080/event/tickets/${eventid}`)
            .then(res => {
                setTickets(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    console.log(tickets)

    const [orderstate, setOrderstate] = useState({
        ticketid: "",
        type: "",
        tickets: 0,
        amt: 0,
        email: ""
    })

    function loadScript(src: any) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:8080/event/razorpay-payment");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: 'rzp_test_gOJHq6k4ckujwv', // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "ERS Eventors",
            description: "Test Transaction",
            //image: { "" },
            order_id: order_id,
            handler: async function (response: any) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:8080/event/razorpay-success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "ERS Eventers",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        console.log(orderstate)
        const { name, value, type } = e.target
        setOrderstate((prevProps) => ({
            ...prevProps,
            [name]: type == "number" ? Number(value) : value
        }));

        if (tickets.length == 1) {
            orderstate.ticketid = tickets[0].ticketid
        }

        const ticket: any = tickets.find((t: any) => t.ticketid === orderstate.ticketid)
        if (ticket) {
            orderstate.type = ticket.type
            orderstate.tickets = Number(e.target.value);
            orderstate.amt = Number(e.target.value) * ticket.price;
        }

    }

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const userdata = JSON.parse(localStorage.getItem('userdetails')!);

        if (userdata) {

            displayRazorpay();

            orderstate.email = userdata.email;

            axios.post('http://localhost:8080/event/order/post', orderstate)
                .then(res => {

                    axios.post("/api/sendEmail", orderstate)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        else {
            toast("Unknown error occurred")
        }


    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className="p-6 mx-4 bg-bgSoft border border-gray-700 rounded-lg">
                <Typography className='text-center font-bold' variant='h4'>Book a Ticket!</Typography>
                <form onSubmit={submitForm} className="mt-10 w-full max-w-lg">

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                Type
                            </label>
                            <div className="relative">
                                <select name="ticketid" onChange={handleInputChange} value={orderstate.ticketid} required className="block appearance-none w-full bg-gray-700 border border-gray-500 text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    {
                                        tickets.map((ticket: any) => (
                                            <option key={ticket.ticketid} value={ticket.ticketid}>{ticket.type}</option>
                                        ))
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                No.
                            </label>
                            <input name="tickets" min={0} required onChange={handleInputChange} value={orderstate.tickets} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="No. of tickets" />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                Total:
                            </label>
                            <input readOnly className="appearance-none block w-full bg-gray-700 text-gray-100 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" value={orderstate.amt} />
                        </div>
                    </div>

                    <button className="mt-5 text-gray-900 bg-blue-500 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">PAY {orderstate.amt}</button>

                </form>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Booking;