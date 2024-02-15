'use client'

import { useEffect, useState } from "react";
import Link from 'next/link'
import { Typography } from "@mui/material";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError, AxiosResponse } from "axios";

const DashBoard = () => {

    const pathname = useSearchParams();
    const [orders, setOrders] = useState([]);

    const eventid = pathname.get('eventid')

    useEffect(() => {

        axios.get(`${process.env.HOST}/server/event/orders/${eventid}`)
        .then((res: AxiosResponse) => {
            console.log(res);
            setOrders(res.data)

        })
        .catch((e: AxiosError) => console.log(e))

        axios.get(`${process.env.HOST}/server/event/${eventid}`)
            .then((res: AxiosResponse) => {
                console.log(res.data)
            })
            .catch((e: AxiosError) => console.log(e))

    }, [])

    const data = [
        {
            day: "Sunday",
            order: 0
        },
        {
            day: "Monday",
            order: 0,
        },
        {
            day: "Tuesday",
            order: 0,
        },
        {
            day: "Wednesday",
            order: 0,
        },
        {
            day: "Thursday",
            order: 0,
        },
        {
            day: "Friday",
            order: 0,
        },
        {
            day: "Saturday",
            order: 0,
        },
    ];

    orders.map((order: any) => {
        console.log(order?.purchasedate)
        let day;
        switch (new Date(order?.purchasedate).getDay()) {
            case 0:
                day = data.find((d) => d.day === "Sunday")
                day!.order += order?.tickets
                break;
            case 1:
                day = data.find((d) => d.day === "Monday")
                day!.order += order?.tickets
                break;
            case 2:
                day = data.find((d) => d.day === "Tuesday")
                day!.order += order?.tickets
                break;
            case 3:
                day = data.find((d) => d.day === "Wednesday")
                day!.order += order?.tickets
                break;
            case 4:
                day = data.find((d) => d.day === "Thursday")
                day!.order += order?.tickets
                break;
            case 5:
                day = data.find((d) => d.day === "Friday")
                day!.order += order?.tickets
                break;
            case 6:
                day = data.find((d) => d.day === "Saturday")
                day!.order += order?.tickets
                break;
        }
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                </div>
                <Chart data={data} />
                <Transactions orders={orders} />
                <Typography variant="h4">Booking URL</Typography>
                <Link href={`/registration/?eventid=${eventid}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Go to Booking!</Link>

            </div>
            <div className={styles.side}>
                <RightBar />
            </div>
        </div>
    );
}

export default DashBoard;