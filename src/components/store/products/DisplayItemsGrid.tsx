import React from "react";
import { productsStorageType } from "../../../global/general";
import { useCookies } from "react-cookie";
import Image from 'next/image'

export default function ProductsDisplayGrid({ products }: { products: productsStorageType }) {

    const [cookies, setCookie] = useCookies(['cart']);
    const cart = cookies.cart as { [key: string]: { itemName: string, imageSrc: string, quantity: number, price: number } }

    return products.size > 0 ? (
        <div className="
        h-min sm:mt-[10vh] items-start
        grid grid-cols-1 sm:grid-cols-2 sm:top-[15vh] lg:grid-cols-3 xl:grid-cols-4
        " style={{ gridRowGap: "12vh", gridColumnGap: "7%"}}>

            {Array.from(products.keys()).map(id => {

                const { itemName, price, imageSrc, authorLink, authorName, imageCredit } = products.get(id)!!;
                const { quantity = 0 } = (cart && cart[id]) || {}

                return (
                    <div key={id} className="sm:w-auto sm:flex flex-col sm:justify-end mx-auto flex-grow">
                        <div className="relative min-h-[30vh]">
                            <Image quality={50} fill={true} sizes="100%" alt="product" src={imageSrc}/>
                        </div>
                        <h4 className="mx-0 my-[2vh]">{itemName}</h4>

                        <div className="flex justify-between items-center">
                            <h5 className="m-0">${price}</h5>

                            <div className="flex min-w-min max-w-[50%] justify-evenly items-center">

                                <h2 className="m-0 cursor-pointer" onClick={() => {
                                    if (quantity > 0) {
                                        setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity - 1, price: price } })
                                    }
                                }}>-</h2>
                                <input className="w-1/2 text-center" type="number" onChange={(e) => setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: e.target.valueAsNumber, price: price } })} value={quantity}></input>
                                <h2 className="m-0 cursor-pointer" onClick={() => setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity + 1, price: price } })}>+</h2>
                            </div>

                        </div>
                        <div className="flex justify-between items-center">
                            <h6 className="m-0">Image by: <a href={authorLink} style={{ textDecoration: "none", color: "rgb(0, 0, 238)" }}>{authorName}</a></h6>
                            <a href={imageCredit} style={{ fontSize: "0.67em", fontWeight: "bold", textDecoration: "none", color: "rgb(0, 0, 238)" }}>Image source</a>
                        </div>
                    </div>
                )

            })}

        </div>
    ) : <NoItemsToDisplay />
}

function NoItemsToDisplay() { return <h3 className="relative left-0 mx-auto top-[13vh]">No items to display</h3> }