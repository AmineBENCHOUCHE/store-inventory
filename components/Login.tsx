'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

import { signOut, useSession } from "next-auth/react";
import { Button, Typography } from '@mui/material';


const Login = () => {
    const session = useSession()

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-10'>
            <Typography variant='h1'>Welcome to the Store Inventory App
            </Typography>
            <div>
                {session?.data?.user?.name}
            </div>
            <button onClick={() => signIn('google')} className="relative inline-flex w-[20rem] h-24  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-2xl font-medium text-white backdrop-blur-3xl">
                    Login
                </span>
            </button>
        </div>
    )
}

export default Login
