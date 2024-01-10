"use client"

import OtherHeader from "@/components/OtherHeader";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default () => {
    return <div className="text-center">
        <OtherHeader />

        <div className="my-[5vh] px-[5vw]">
            <Suspense fallback={<h1>Loading...</h1>}>
                <h1>Payment Success</h1>
                <DisplayOrderID />
                <h3>Your order ID allows you to keep track of your order at</h3>
                <a className="underline hover:cursor-pointer" href="/trackmyorder">Track your order</a>
            </Suspense>
        </div>
    </div>
}

function DisplayOrderID() {

    const searchParams = useSearchParams();

    const orderID = searchParams.get("orderID");

    return <h3 className="my-[5vh] break-words">Order ID: {orderID}</h3>
}