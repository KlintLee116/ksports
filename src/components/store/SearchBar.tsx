"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

export default function SearchBar() {
    

    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') ?? '');

    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    // Update searchTerm state on user input
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    // Apply debouncing effect
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(searchTerm), 250)

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Effect for routing
    useEffect(() => router.push(debouncedTerm === "" ? '/#displayItems' : `/?name=${debouncedTerm}#displayItems`), [debouncedTerm]);

    return <div className="sticky py-[3vh] top-0 right-0 z-[20] bg-white">
        <div className="flex py-[2vh] bg-[#F3F5F5] rounded-xl">
            <label>
                <img width={300} height={400} alt="search-icon" className="ml-[2vw]
             w-[1.5rem] aspect-square h-full"
                    src="/icons/search.png" /></label>
            <input
                value={searchTerm}
                className="w-full outline-none ml-4 text-lg border-none"
                onChange={handleSearchChange}
                style={{backgroundColor: "#F3F5F5"}} type="text" placeholder='Search for a product or a sport' />
        </div>
    </div>
}