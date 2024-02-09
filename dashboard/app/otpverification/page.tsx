'use client'
import axios from "axios";
import { Redirect } from "next";
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

const OTP = () => {

    const params = useSearchParams();
    const router = useRouter();
    const pageid = params.get('pageid')    
    const eventid = params.get('eventid')

    interface Details {
        name: String,
        email: String,
        phoneno: String
    }

    const [userdetails, setuserdetails] = useState<Details>();

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('userdetails')!);
        setuserdetails(userdata)

    }, [])

    const OTP: Array<string> = [];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, maxLength } = event.target;

        const [fieldName, fieldIndex] = name.split("-");
        let fieldIntIndex = parseInt(fieldIndex, 10);

        OTP.push(value);

        if (value.length >= maxLength) {
            const nextfield: any = document.querySelector(
                `input[name=field-${fieldIntIndex + 1}]`
            );

            // If found, focus the next field
            if (nextfield !== null) {
                nextfield.focus();
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const otp = OTP.join('');

        axios.post(`http://${process.env.HOST}:8080/event/verify-otp`, {
            otp: otp,
            pageid: pageid
        })
            .then(res => {
                toast('done!')
                axios.post(`http://${process.env.HOST}:8080/event/create-user`, userdetails)
                .then(res => {
                    console.log(res.data);
                    router.push(`/booking/?eventid=${eventid}`)
                })
                .catch(err => console.log(err))
            })
            .catch(err => toast.error("Invalid OTP :(", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }))
    }

    return (
        <div>
            <div className="h-screen w-full flex justify-center items-center">
                <div className="container mx-auto">
                    <div className="max-w-sm mx-auto md:max-w-lg">
                        <div className="w-full">
                            <div className="bg-bgSoft text-gray-400 h-96 py-10  rounded-xl text-center">
                                <h1 className="text-2xl font-bold">OTP Verification</h1>
                                <div className="flex flex-col mt-4">
                                    <span className="text-white-300">Enter the OTP you recieved at</span>
                                    <span className="text-grey">{userdetails?.email}</span>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                        <input required onChange={handleChange} className="m-2 text-black font-extrabold bg-gray-300 border h-10 w-10 text-center form-control rounded" type="text" name="field-1" maxLength={1} />
                                        <input required onChange={handleChange} className="m-2 text-black font-extrabold bg-gray-300 border h-10 w-10 text-center form-control rounded" type="text" name="field-2" maxLength={1} />
                                        <input required onChange={handleChange} className="m-2 text-black font-extrabold bg-gray-300 border h-10 w-10 text-center form-control rounded" type="text" name="field-3" maxLength={1} />
                                        <input required onChange={handleChange} className="m-2 text-black font-extrabold bg-gray-300 border h-10 w-10 text-center form-control rounded" type="text" name="field-4" maxLength={1} />
                                    </div>

                                    <div className="flex justify-center text-center mt-5">
                                        <a className="flex items-center text-blue-400 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>

                                    </div>
                                    <div className="flex justify-center text-center mt-5">
                                        <button type="submit" className="mt-5 text-gray-900 bg-gray-400 border border-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">VERIFY</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default OTP;