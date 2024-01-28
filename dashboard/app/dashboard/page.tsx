'use client'

import { useEffect } from "react";
import { Typography } from "@mui/material";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from "axios";

const DashBoard = () => {

    const pathname = useSearchParams();

    const eventid = pathname.get('eventid')

    useEffect(() => {

        axios.get(`http://localhost:8080/event/${eventid}`)
            .then((res: any) => {
                console.log(res.data)
            })
            .catch((e: AxiosError) => console.log(e))

    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                </div>
                <Chart />
                <Transactions />
                <Typography variant="h4">Booking URL</Typography>
                <a href={`http://localhost:3000/registration/?eventid=${eventid}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Go to Booking!</a>

            </div>
            <div className={styles.side}>
                <RightBar />
            </div>
        </div>
    );
}

export default DashBoard;