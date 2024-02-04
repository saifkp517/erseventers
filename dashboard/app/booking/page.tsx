'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios, {AxiosResponse, AxiosError} from 'axios';
import Ticket from '../ui/dashboard/card/Ticket';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {

    const params = useSearchParams();
    const [tickets, setTickets] = useState<any>([]);
    const [event, setEvent] = useState<any>();
    let [orders, setOrders] = useState<any>([])
    let [total, setTotal] = useState(0)
    const eventid = params.get('eventid')
    const [userdata, setUserdata] = useState<any>()


    useEffect(() => {

        setUserdata(JSON.parse(localStorage.getItem('userdetails')!));

        axios.get(`http://localhost:8080/event/${eventid}`)
        .then((res: AxiosResponse) => {
            setEvent(res.data)
            console.log(res.data)
        })
        .catch((e: AxiosError) => console.log(e))

        axios.get(`http://localhost:8080/event/tickets/${eventid}`)
            .then(res => {
                setTickets(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    

    const [ticketid, setTicketId] = useState("");

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

    const displayRazorpay = async (purchaseamount: number) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            toast("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:8080/event/razorpay-payment", {
            amt: purchaseamount
        });

        if (!result) {
            toast("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: 'rzp_test_O6ZQlnhFYJEhxP', // Enter the Key ID generated from the Dashboard
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
                if(result) {
                    for(let i = 0; i < orders.length; i++)
                    {
                        console.log({
                            eventid: eventid,
                            ticketid: orders[i].ticketid,
                            amt: orders[i].amt,
                            tickets: Number(orders[i].tickets),
                            email: orders[i].email,
                            type: orders[i].type
                        })
                        axios.post('http://localhost:8080/event/order/post', {
                            eventid: eventid,
                            ticketid: orders[i].ticketid,
                            amt: orders[i].amt,
                            tickets: Number(orders[i].tickets),
                            email: orders[i].email,
                            type: orders[i].type
                        })
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                    }
                }

                toast(result.data.msg);
            },
            prefill: {
                name: userdata.name,
                email: userdata.email,
                contact: userdata.phoneno,
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


    const handlePayment = (total: number) => {
        displayRazorpay(total)
    }



    return (
        <div className='h-screen w-full'>
            <div
                className="p-6 mx-4 mb-36">
                <Image alt="Event Image" className='mx-auto my-5 rounded-xl' src={`http://localhost:8080/images/${event?.imageLoc}`} width={120} height={120}  />
                <Typography className='text-center font-bold mt-18' variant='h4'>{event?.title}</Typography>
                <Typography className='text-center font-bold mb-6'>{new Date(event?.date).toDateString()}</Typography>
                
                <div className='grid grid-cols-1 place-items-center '>

                    <div className=" w-full lg:w-1/2 bg-bgSoft border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {
                            tickets.map((ticket: any, index: number) => {

                                return (
                                    <Ticket 
                                        key={index}
                                        ticket={ticket}
                                        index={index} 
                                        orders={orders}
                                        userdata={userdata}
                                        setTotal={setTotal}
                                    />
                                )

                            })
                        }
                    </div>

                </div>

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
            <footer className="flex flex-col h-30 p-10 bg-gray-700 sticky bottom-0">
                <div className=' text-center'>
                    <button className="bg-bgSoft border rounded border-gray-900 p-3" onClick={() => handlePayment(total)}>PAY ₹{total}</button><br />
                </div>
            </footer>

        </div>
    );
}

export default Booking;