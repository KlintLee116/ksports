"use client"

import OtherHeader from '@/components/OtherHeader'
import { checkout, checkoutItemStructure } from "@/global/general";
import { useCookies } from "react-cookie"
import { CookieSetOptions } from "universal-cookie"
import Image from 'next/image'

export default function CheckoutPage() {

    return <>
        <OtherHeader />
        <CheckoutItemsDisplay />
    </>
}

function CheckoutItemsDisplay() {

    const [cookies, setCookie] = useCookies(['cart']);

    const cart = cookies.cart as { [key: string]: { itemName: string, imageSrc: string, quantity: number, price: string } }

    const itemsForCheckout: checkoutItemStructure[] = cart ? Object.values(cart).map(item => {
        const productName = item.itemName;
        const priceInCent = parseInt(item.price) * 100;
        const amount = item.quantity!!;

        // Assuming default currency is USD, modify as needed
        const currency = 'USD';

        // Create the price_data structure
        const price_data = {
            currency: currency,
            product_data: {
                name: productName,
            },
            unit_amount: priceInCent,
        };

        // Return the item structure
        return {
            price_data: price_data,
            quantity: amount,
        };
    }) : []

    return (cart ? Object.keys(cart).length > 0 ?
        <div style={{ margin: "8vh 4vw" }}>
            {Object.keys(cart).map(idStr => {

                const id = parseInt(idStr)

                return CheckoutItemCard({ id, cookies, setCookie })

            })}
            <button onClick={async () => {
                const url = await checkout(itemsForCheckout)
                window.location.href = url;
            }}
                className='ml-auto mt-[3vh] block bg-green-500 text-white text-xl py-[1vh] px-[4vw]'>Checkout</button>
        </div >
        :
        <h3 className='text-center'>Nothing in cart now</h3>
        :
        <h3 className='text-center'>Nothing in cart now</h3>

    )
}

function CheckoutItemCard({ id, cookies, setCookie }: {
    id: number, cookies: {
        cart?: any;
    }, setCookie: (name: "cart", value: any, options?: CookieSetOptions | undefined) => void
}) {

    const cart = cookies.cart
    const { imageSrc, itemName, price, quantity } = cart[id]

    return <div key={id} className='flex justify-between flex-wrap gap-[2vw] mb-[2vh] py-[2vh] px-[10vw]'
        style={{ border: "1px solid black", borderRadius: "0.5rem" }}>
        <div className='relative w-[30vw]'>
            <Image quality={50} fill={true} objectFit='contain' src={`/${imageSrc}`} alt="Product image" />
        </div>
        <div className='w-1/2 flex flex-col justify-between gap-[5vh]'>
            <div>
                <p className='text-2xl m-0 mb-[2vh]'>{itemName}</p>
                <p className='text-2xl'>${price}</p>
            </div>
            <div className='flex items-center justify-between'>
                <button onClick={() => {
                    const { [id]: removedItem, ...restOfCart } = cart

                    setCookie('cart', restOfCart)

                }}
                    className='bg-red-500 m-0 text-center py-0 px-[20px]' style={{ lineHeight: "6vh" }}>Remove</button>

                <div className='flex justify-evenly'>
                    <p className='w-[30px] cursor-pointer text-2xl' onClick={() => { setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity - 1, price: price } }) }}>-</p>
                    <p className='w-[30px] text-2xl'>{quantity}</p>
                    <p className='w-[30px] cursor-pointer text-2xl' onClick={() => { setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity + 1, price: price } }) }}>+</p>
                </div>
            </div>
        </div>
    </div >
}
