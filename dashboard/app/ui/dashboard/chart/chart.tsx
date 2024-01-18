"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        day: "Monday",
        order: 280,
        clicks: 340
    },
    {
        day: "Tuesday",
        order: 210,
        clicks: 382
    },
    {
        day: "Wednesday",
        order: 120,
        clicks: 180
    },
    {
        day: "Thursday",
        order: 135,
        clicks: 234
    },
    {
        day: "Friday",
        order: 129,
        clicks: 465
    },
    {
        day: "Saturday",
        order: 179,
        clicks: 287
    },
    {
        day: "Sunday",
        order: 98,
        clicks: 319
    },
];

const Chart = () => {
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
                    <Tooltip contentStyle={{background: "#151c2c", border: "none"}} />
                    <Legend />
                    <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="order" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;