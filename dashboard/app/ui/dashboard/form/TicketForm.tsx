"use client"

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const TicketForm: any = ({ submitHandler, handleInputChange, ticket }: any) => {


    return (
        <div className="mt-5">

            <form onSubmit={submitHandler} className="p-6 max-w-lg shadow-black shadow-2xl  rounded-lg bg-bgSoft border border-gray-600 card mx-auto">

                <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket type</label>
                    <input name="type" value={ticket.type} onChange={handleInputChange} type="text" className="shadow-sm bg-bgSoft border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Ticket type" required />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Price</label>
                    <input name="amt" value={ticket.amt} onChange={handleInputChange} type="number" className="shadow-sm bg-bgSoft border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Ticket Price" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Quantity</label>
                    <input name="qty" value={ticket.qty} onChange={handleInputChange} type="number" className="shadow-sm bg-bgSoft border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Ticket Quantity" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Description</label>
                    <textarea name="description" value={ticket.description} onChange={handleInputChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-textSoft bg-bgSoft rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter ticket description..."></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Ticket</button>
            </form>
            <ToastContainer
                position="bottom-left"
                theme="dark"
            />
        </div>
    );
}

export default TicketForm;