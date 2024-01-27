'use client';
// import styles from './booking.module.css'
// import { ToastContainer, toast } from 'react-toastify';
// import React, { Component, useEffect, useState } from 'react'
// import { Typography } from '@mui/material';
// import { useSearchParams } from 'next/navigation';
// import axios from 'axios';

// const Booking = () => {

//     const params = useSearchParams();
//     const [tickets, setTickets] = useState([]);
//     const eventid = params.get('eventid')

//     useEffect(() => {
//         axios.get(`http://localhost:8080/event/tickets/${eventid}`)
//             .then(res => {
//                 setTickets(res.data)
//             })
//             .catch(err => console.log(err))
//     }, [])

//     console.log(tickets)

//     const [orderstate, setOrderstate] = useState({
//         ticketid: "",
//         name: "",
//         email: "",
//         tickets: 0,
//         phoneno: "",
//         amt: 0,
//         organizer: eventid
//     })

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         console.log(orderstate)
//         const { name, value, type } = e.target
//         setOrderstate((prevProps) => ({
//             ...prevProps,
//             [name]: type == "number" ? Number(value) : value
//         }));

//         const ticket: any = tickets.find((t: any) => t.ticketid === orderstate.ticketid)
//         if (ticket) {
//             orderstate.tickets = Number(e.target.value);
//             orderstate.amt = Number(e.target.value) * ticket.price;
//         }

//     }

//     const submitForm = (e: React.FormEvent) => {
//         e.preventDefault();
//         axios.post('http://localhost:8080/event/order/post', orderstate)
//             .then(res => {
//                 axios.post("/api/sendEmail", orderstate)
//                     .then(res => console.log(res))
//                     .catch(err => console.log(err))
//             })
//             .catch(err => console.log(err))
//     }

//     return (
//         <div className='h-screen w-full flex justify-center items-center'>
//             <div className="p-6 mx-4 bg-bgSoft border border-gray-700 rounded-lg">
//                 <Typography className='text-center font-bold' variant='h4'>Book a Ticket!</Typography>
//                 <form onSubmit={submitForm} className="mt-10 w-full max-w-lg">
//                     <div className="flex flex-wrap -mx-3 mb-6">
//                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 Name
//                             </label>
//                             <input name="name" required onChange={handleInputChange} value={orderstate.name} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter your name..." />
//                         </div>
//                         <div className="w-full md:w-1/2 px-3">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 Email
//                             </label>
//                             <input name="email" required onChange={handleInputChange} value={orderstate.email} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="example@mail.com" />
//                         </div>
//                     </div>
//                     <div className="flex flex-wrap -mx-3 mb-6">
//                         <div className="w-full px-3">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 Phone No
//                             </label>
//                             <input name="phoneno" onChange={handleInputChange} value={orderstate.phoneno} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="tel" placeholder="Enter your Phone no..." />

//                         </div>
//                     </div>
//                     <div className="flex flex-wrap -mx-3 mb-2">
//                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 Type
//                             </label>
//                             <div className="relative">
//                                 <select name="ticketid" onChange={handleInputChange} value={orderstate.ticketid} required className="block appearance-none w-full bg-gray-700 border border-gray-500 text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
//                                     {
//                                         tickets.map((ticket: any) => (
//                                             <option key={ticket.ticketid} value={ticket.ticketid}>{ticket.type}</option>
//                                         ))
//                                     }
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 No.
//                             </label>
//                             <input name="tickets" min={0} required onChange={handleInputChange} value={orderstate.tickets} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="No. of tickets" />
//                         </div>

//                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                             <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
//                                 Total:
//                             </label>
//                             <input readOnly className="appearance-none block w-full bg-gray-700 text-gray-100 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" value={orderstate.amt} />
//                         </div>
//                     </div>

//                     <button className="mt-5 text-gray-900 bg-blue-500 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Booking;

import styles from './booking.module.css'
import { useRouter } from 'next/navigation'
import React, { Component, useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';


const Registration = () => {

    const router = useRouter()

    const [userdetails, setuserdetails] = useState({
        name: "",
        email: "",
        phoneno: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setuserdetails((prevProps) => ({
            ...prevProps,
            [name]: type == "number" ? Number(value) : value
        }));
    }

    const submitForm = (e: React.FormEvent) => {

        e.preventDefault();

        var otp = Math.floor(1000 + Math.random() * 9000)

        const pageid = uuidv4();

        axios.post('/api/sendEmail', {
            otp: otp,
            email: userdetails.email
        })
            .then((res: AxiosResponse) => {
                console.log(res.data)
                axios.post('http://localhost:8080/event/create-otp', {
                    otp: JSON.stringify(otp),
                    pageid: pageid
                })
                    .then(res => {
                        localStorage.setItem('userdetails', JSON.stringify(userdetails))
                        router.push(`/otpverification?pageid=${pageid}`)
                    })
            })
    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className="p-6 mx-4 bg-bgSoft border border-gray-700 rounded-lg">
                <Typography className='text-center font-bold' variant='h4'>Book a Ticket!</Typography>
                <form onSubmit={submitForm} className="mt-10 w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                Name
                            </label>
                            <input name="name" required onChange={handleInputChange} value={userdetails.name} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter your name..." />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                Email
                            </label>
                            <input name="email" required onChange={handleInputChange} value={userdetails.email} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="example@mail.com" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" >
                                Phone No
                            </label>
                            <input name="phoneno" onChange={handleInputChange} value={userdetails.phoneno} className="appearance-none block w-full bg-gray-700 text-gray-800 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="tel" placeholder="Enter your Phone no..." />

                        </div>
                    </div>
                    <button className="mt-5 text-gray-900 bg-blue-500 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;