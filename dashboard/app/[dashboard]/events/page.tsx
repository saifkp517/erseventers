"use client"
import axios from "axios";
import EventCard from "@/app/ui/dashboard/eventcard/card";
import React, {useState, useEffect} from "react";

const Users = () => {

    const [events, setEvents] = useState([]);

    axios.get('http://localhost:8080/event')
    .then(data => console.log(data))
    .catch(err => console.log(err))

    return (
        <div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-8 ">
                <EventCard img={"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                <EventCard img={"https://images.unsplash.com/photo-1520242739010-44e95bde329e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                <EventCard img={"https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                <EventCard img={"https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            </div>

        </div>
    );
}

export default Users;