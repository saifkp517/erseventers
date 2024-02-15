'use client';

import styles from './booking.module.css'
import { useRouter } from 'next/navigation'
import React, { Component, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import Navbar from '../ui/booking/navbar';


const Registration = () => {

    const router = useRouter()
    const params = useSearchParams();
    const eventid = params.get('eventid')
    const [loading, setLoading] = useState(false)

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

    const submitForm = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true)

        var otp = Math.floor(1000 + Math.random() * 9000)

        const pageid = uuidv4();

        axios.get(`http://${process.env.HOST}/event/get-user/${userdetails.email}`)
            .then(res => {
                if (res.data.length != 0) {
                    localStorage.setItem('userdetails', JSON.stringify(userdetails))
                    router.push(`/booking/?eventid=${eventid}`)
                } else {
                    axios.post('/api/sendEmail', {
                        otp: otp,
                        email: userdetails.email
                    })
                        .then((res: AxiosResponse) => {
                            console.log(res.data)
                            axios.post(`http://${process.env.HOST}/event/create-otp`, {
                                otp: JSON.stringify(otp),
                                pageid: pageid
                            })
                                .then(res => {
                                    localStorage.setItem('userdetails', JSON.stringify(userdetails))
                                    router.push(`/otpverification?pageid=${pageid}&eventid=${eventid}`)
                                })
                        })
                }

            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <Navbar />
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
                        <button className="mt-5 text-gray-900 bg-blue-500 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            {loading ? <>Loading...</> : <>Register</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;