"use client"

import styles from './chart.module.css'
import axios from 'axios';
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = ({ data }: any) => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title} >Weekly Orders Recap</h1>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
                    <Legend />
                    <Line type="monotone" dataKey="order" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;