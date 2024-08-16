import { SignIn } from "@clerk/nextjs";
import Topbar from "../components/topbar";
import React from 'react'

export default function Page() {
    return(

        <div>
            <Topbar />
            <div style = {{display:"flex", alignItems:"center", justifyContent: "center", height:"100vh"}}>
                <SignIn  routing = "hash"/>
            </div>
        </div>


    ) 
}