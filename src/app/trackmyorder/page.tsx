"use client"

import OtherHeader from "@/components/OtherHeader";
import { fetchPurchasedItems } from "@/global/general";
import { CSSProperties, useRef, useState } from "react";

type purchasedItemsFormat = {
    price_data: {
        currency: string
        product_data: {
            name: string
        }
        unit_amount: number
    }, quantity: number
}

const styles: { [key: string]: CSSProperties } = {
    inputs: {
        border: "1px solid grey",
        borderRadius: "5px",
        width: "100%",
        lineHeight: "7vh",
        outline: "none",
        marginBottom: "2vh",
        textAlign:"center"
    },
};

export default function TrackMyOrderPage() {
    const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
    const form = useRef<HTMLFormElement>(null);

    const getPurchasedItems = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const orderNumber = form.current?.elements.namedItem("number") as HTMLInputElement;
            const items = await fetchPurchasedItems(orderNumber.value);
            setPurchasedItems([])

            if (items) {
                const productsInJSON = JSON.parse(items["metadata"]["checkoutProducts"])
                setPurchasedItems(prev => prev.concat(productsInJSON))
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <OtherHeader />
            <div style={{ margin: "6vh 4vw" }}>
                <form ref={form} onSubmit={getPurchasedItems}>
                    <p className="text-center my-[5vh] text-3xl">Track Order Status</p>
                    <input name="number" type="text" style={styles.inputs} placeholder="   Order Number" />
                    <button
                        type="submit"
                        className="w-full p-[2vh] bg-blue-600 text-white font-bold text-xl"
                    >
                        Track
                    </button>
                </form>

                {purchasedItems.length > 0 ?
                    purchasedItems.map((item: purchasedItemsFormat, index) => {
                        return (
                            <div key={index} className="flex justify-evenly items-center rounded-md mx-0 my-[2vh] py-[3vh]" style={{border: "1px solid black"}}>
                                <p className="text-xl">{item.price_data.product_data.name}</p>
                                <p className="text-xl">Price: ${item.price_data.unit_amount / 100}</p>
                                <p className="text-xl">Quantity: {item.quantity}</p>
                            </div>)
                    })
                    :
                    <h3>No data</h3>
                }
            </div>
        </>
    );
}