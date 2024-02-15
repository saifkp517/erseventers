"use client"
import React, { Component } from 'react'
import Link from 'next/link';

class Login extends Component {
    state = {  } 
    render() { 
        return (
            <Link href="/api/auth/login">Login</Link>
        );
    }
}
 
export default Login;