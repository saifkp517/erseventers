import styles from './booking.module.css'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { randomUUID } from 'crypto';
import { Typography } from '@mui/material';
import axios from 'axios';


const Registration = () => {

    const [userdetails, setuserdetails] = useState({
        name: "",
        email: "",
        phoneno: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(userdetails)
        const { name, value, type } = e.target
        setuserdetails((prevProps) => ({
            ...prevProps,
            [name]: type == "number" ? Number(value) : value
        }));
    }

    const submitForm = (e: React.FormEvent) => {

        var otp = Math.floor(1000 + Math.random() * 9000)

        const pageid = randomUUID;

        axios.post('/api/sendEmail', {
            otp: otp,
            email: userdetails.email
        })
            .then(res => {
                axios.post('http://localhost:8080/events/otp', {
                    otp: otp,
                    pageid: pageid
                })
                    .then(res => {
                        localStorage.setItem('userdetails', JSON.stringify(userdetails))
                        redirect(`/otpverification?pageid=${pageid}`)
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