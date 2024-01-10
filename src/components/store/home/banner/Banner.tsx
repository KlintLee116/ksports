"use client"

import { useState } from "react"
import BannerItems from "./BannerItems"

export default function Banner() {

    const [transformX, setTransformX] = useState(0);

    const handleLeftClick = () => transformX !== 0 && setTransformX(transformX + 100);
    const handleRightClick = () => transformX !== -200 && setTransformX(transformX - 100);

    return BannerItems.length > 0 ? (
        <div className="overflow-hidden whitespace-nowrap w-full h-[25vh] sm:h-[30vh] lg:h-[40vh] ssm:w-[90%] sm:w-[70%] mx-auto md:w-[55%] xl:w-[45%]">
            {BannerItems.map((item, id) => {
                return <div key={id}
                    className="inline-block h-full w-full my-0 mx-auto transition-transform duration-500 ease-in-out transform"
                    style={{ transform: `translateX(${transformX}%)` }}>
                    <div className="w-[90%] h-full mx-auto relative">
                        {item}
                        <div className="items-center flex absolute top-0 left-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
                            <h4 onClick={handleLeftClick} style={{ display: transformX !== 0 ? "block" : "none", cursor: transformX !== 0 ? "pointer" : "default" }}>&#8249;</h4>
                        </div>
                        <div className="items-center flex absolute top-0 right-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
                            <h4 onClick={handleRightClick} style={{ display: transformX !== -200 ? "block" : "none", cursor: transformX !== -200 ? "pointer" : "default" }}>&#8250;</h4>
                        </div>
                    </div>
                </div>
            }
            )}
        </div>) : <h1>Nothing to show</h1>
}