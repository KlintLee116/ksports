"use client"

import { useRouter } from "next/navigation"

export default function OtherHeader() {

    const router = useRouter()

    return <header style={{textAlign:"center", margin:"1vh 0", borderBottom:"0.5px solid gray"}}>
        <h3 onClick={() => router.push('/')} style={{cursor:"pointer", backgroundColor: "blue", padding: "0.5rem 1rem", color: "white", margin:"1vh 0", display:'inline-block'}}>K Sports</h3>
    </header>
}