"use client"

import DatePicker from "tailwind-datepicker-react";
import Image from "next/image";
import React, { useState, useEffect, FormEventHandler } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const EventForm = ({ image, state, handleInputChange, handleFileChange, checked }: any) => {

    const options = {
        title: "Date Picker",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2100-01-01"),
        theme: {
            background: "bg-bgSoft",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "text-textSoft",
            disabledText: "",
            input: "",
            inputIcon: "",
            selected: "bg-blue-500",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>{`<`}</span>,
            next: () => <span>{`>`}</span>,
        },
        datepickerClassNames: "top-220",
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
    }

    const [show, setShow] = useState<boolean>(false);

    const handleChange = (selectedDate: Date) => {
        state.date = selectedDate;
    }
    const handleClose = (state: boolean) => {
        setShow(state)
    }

    return (
        <div className="mt-5">
            <Typography className="text-center text-textSoft" variant="h2">Launch Event</Typography>
            <form className=" max-w-3xl mx-auto">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Event Title</label>
                    <input name="title" value={state.title} onChange={handleInputChange} type="text" id="title" className="shadow-sm bg-bgSoft border border-gray-400 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Event Name" required />
                    {(checked == true && state.title == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    {
                        image.preview === "" ? (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Banner Image</label>
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-bgSoft dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-textSoft dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-textSoft dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-textSoft dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input name="file" accept="image/*" onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        )
                            :
                            (
                                <div className="relative max-h-96 border-2 border-gray-400 border-dashed rounded-lg">
                                    <Image className="max-h-80 rounded-lg" src={`${image.preview}`} alt="" height={10} width={10} layout="responsive" />
                                    <input name="file" accept="image/*" onChange={handleFileChange} id="dropzone-file" type="file"/>
                                </div>
                            )
                    }

                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Event Category</label>
                    <select name="category" value={state.category} onChange={handleInputChange} id="countries" className="bg-bgSoft border border-gray-400 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue={"Choose a Category"}>Choose a Category</option>
                        <option value="Concerts">Concerts</option>
                        <option value="Club-Show">Club-Show</option>
                        <option value="Pop-ups">Pop-ups</option>
                        <option value="Festival">Festival</option>
                    </select>
                    {(checked == true && state.category == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Tags</label>
                    <input multiple size={1} name="tags" value={state.tags} onChange={handleInputChange} type="tags" id="tags" className="shadow-sm bg-bgSoft border border-gray-400 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Tags" required />
                    {(checked == true && state.tags == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Date</label>
                    <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                    {(checked == true && state.date == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Time</label>
                    <input name="time" value={state.time} onChange={handleInputChange} type="venue" id="venue" className="shadow-sm bg-bgSoft border border-gray-400 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Time" required />
                    {(checked == true && state.time == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Venue</label>
                    <input name="venue" value={state.venue} onChange={handleInputChange} type="venue" id="venue" className="shadow-sm bg-bgSoft border border-gray-400 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Venue" required />
                    {(checked == true && state.title == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Artist</label>
                    <input name="artist" value={state.artist} onChange={handleInputChange} type="artist" id="artist" className="shadow-sm bg-bgSoft border border-gray-400 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the names of the Artists" required />
                    {(checked == true && state.artist == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Description</label>
                    <textarea name="description" value={state.description} onChange={handleInputChange} id="message" rows={6} className="block p-2.5 w-full text-sm text-textSoft bg-bgSoft rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give a brief Event Description..."></textarea>
                    {(checked == true && state.description == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">terms</label>
                    <textarea name="terms" value={state.terms} onChange={handleInputChange} id="message" rows={6} className="block p-2.5 w-full text-sm text-textSoft bg-bgSoft rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event terms..."></textarea>
                    {(checked == true && state.terms == "") ? <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> : null}
                </div>
            </form>
        </div>
    )
}

export default EventForm;