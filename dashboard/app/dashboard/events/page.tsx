"use client"
import axios from "axios";
import EventCard from "@/app/ui/dashboard/eventcard/card";
import React, {useState, useEffect} from "react";

const Users = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:8080/server/event`)
        .then(res => {
            setEvents(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-8 ">
                {
                    events.map(event => (
                        <EventCard event={event} />
                    ))
                }
            </div>

        </div>
    );
}

export default Users;