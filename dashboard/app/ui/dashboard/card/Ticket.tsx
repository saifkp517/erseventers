import { useState, useEffect } from "react";
import { Typography } from "@mui/material";


const Ticket = ({eventid, ticket, index, orders, userdata, setTotal}: any) => {

    let [no, setNo] = useState(0);
    let priceAfterTax = ((ticket.price*0.025*0.18)+(ticket.price*0.025)+ticket.price)

    useEffect(() => {

        let sum = orders.reduce((accumulator: number, object: any) => {
            return accumulator + object.amt;
        }, 0);
        setTotal(sum);
    }, [no]);

    const handleChange = (e: any) => {

        const order = {
            eventid: eventid,
            amt: priceAfterTax * e.target.value,
            type: ticket.type,
            tickets: e.target.value,
            email: userdata!.email,
            ticketid: ticket.ticketid,
        }

        orders[index] = order

        setNo(e.target.value)

    }

    return (
        <div className="p-5 space-y-5 grid grid-cols-6">
            <div className="col-span-4 lg:col-span-5">
                <Typography variant='h5' className="mb-2 font-bold tracking-tight text-gray-400"><span className='text-red-400'>Type: </span> {ticket.type}</Typography>
                <Typography variant='h6' className="mb-2 font-normal tracking-tight text-gray-100"><span className='text-pink-400'>Pricing: </span>₹{priceAfterTax}</Typography>
                <Typography className="mb-2 font-normal tracking-tight text--300 text-gray-400">{ticket.description}</Typography>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-200">Amt</label>
                <select onChange={handleChange} value={no} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
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

export default Ticket;