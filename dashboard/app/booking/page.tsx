'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios, {AxiosResponse, AxiosError} from 'axios';
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

    const Ticket = ({ ticket, index, setTotal }: any) => {

        const [number, setNumber] = useState(0);

        const handleChange = (e: any) => {

            const order = {
                eventid: eventid,
                amt: ticket.price * e.target.value,
                type: ticket.type,
                tickets: e.target.value,
                email: userdata!.email,
                ticketid: ticket.ticketid,
            }

            orders[index] = order
            setNumber(Number(e.target.value))

            let sum = orders.reduce((accumulator: number, object: any) => {
                return accumulator + object.amt;
            }, 0)
            setTotal(sum)

        }

        return (
            <div className="p-5 space-y-5 grid grid-cols-6">
                <div className="col-span-5">
                    <Typography variant='h5' className="mb-2 font-bold tracking-tight text-gray-400"><span className='text-red-400'>Type: </span> {ticket.type}</Typography>
                    <Typography variant='h6' className="mb-2 font-normal tracking-tight text-gray-100"><span className='text-pink-400'>Pricing: </span>₹{ticket.price}</Typography>
                    <Typography className="mb-2 font-normal tracking-tight text--300 text-gray-400">{ticket.description}</Typography>
                </div>
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-200">Amt</label>
                    <select name="number" onChange={handleChange} value={number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>

                    </select>
                </div>
                <hr className=' h-px col-span-6 bg-gray-600 border-0' />
            </div>

        )
    }

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
            key: 'rzp_live_5SHX3vtipC9MJu', // Enter the Key ID generated from the Dashboard
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

                toast(result.data.msg);
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

                    <div className="w-12/12 bg-bgSoft border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {
                            tickets.map((ticket: any, index: number) => {

                                return (
                                    <Ticket key={index} ticket={ticket} index={index} setTotal={setTotal} />
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