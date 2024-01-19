'use client';
import styles from './booking.module.css'
import React, { Component } from 'react'
import { useParams } from 'next/navigation';

const Booking = () => {

    const params = useParams();
    console.log(params)

    return ( 
        <div className={styles.container}>
            <h1>Login</h1>
            <form action="post" className={styles.form}>
                <input type="text" />
                <input type="text" />
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default Booking;