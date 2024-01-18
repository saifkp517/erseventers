"use client"

import React, { useState, useEffect, FormEventHandler } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const TicketForm = ({state, handleInputChange}: any) => {

    return (
        <div className="mt-5">
            <Typography className=" my-10 text-center text-textSoft" variant="h3">Ticket Details</Typography>
            <form className="p-6 max-w-lg shadow-black shadow-2xl  rounded-lg bg-bgSoft border border-gray-600 card mx-auto">

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Type</label>
                    <select name="type" value={state.type} onChange={handleInputChange} id="countries" className="bg-bgSoft border border-gray-600 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue={"Choose a Category"}>Choose a Category</option>
                        <option value="Concerts">Concerts</option>
                        <option value="Club-Show">Club-Show</option>
                        <option value="Pop-ups">Pop-ups</option>
                        <option value="Festival">Festival</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Price</label>
                    <input name="price"  value={state.price} onChange={handleInputChange} type="number" id="venue" className="shadow-sm bg-bgSoft border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Ticket Price" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Quantity</label>
                    <input name="qty" value={state.qty} onChange={handleInputChange} type="number" id="venue" className="shadow-sm bg-bgSoft border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Ticket Quantity" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ticket Description</label>
                    <textarea name="description" value={state.description} onChange={handleInputChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-textSoft bg-bgSoft rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter ticket description..."></textarea>
                </div>

                {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Ticket</button> */}
            </form>
        </div>
    );
}

export default TicketForm;