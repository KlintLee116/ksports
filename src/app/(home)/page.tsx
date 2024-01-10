"use client"

import Footer from "@/components/Footer";
import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import SideNav from "@/components/store/SideNav/SideNav";
import Banner from "@/components/store/home/banner/Banner";
import DisplayItemsGrid from "@/components/store/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/products/SortAndFilter";
import { productsStorageType, getProducts, useSortAndFilters, useIsSideNavOpened } from "@/global/general";
import { useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { useState, useEffect, useRef } from "react";

interface ProductSearchParams {
    name: string | undefined;
    max: number | undefined;
    min: number | undefined;
    sortType: string | undefined;
    sideNav: boolean | undefined;
}

export default function ProductsPage() {

    const { SortAndFilters } = useSortAndFilters();
    const searchParams = useSearchParams();

    const { max, min, sortType } = SortAndFilters
    const name = searchParams.get('name') ?? undefined

    const {IsSideNavOpened, setIsSideNavOpened} = useIsSideNavOpened()
    const mainSectionRef = useRef<HTMLDivElement>(null)
    const handleMainSectionClick = () => IsSideNavOpened && setIsSideNavOpened(false)

    useEffect(() => {
        const mainSection = mainSectionRef.current;

        if (mainSection) {

            mainSection.addEventListener('click', handleMainSectionClick)

            return () => mainSection.removeEventListener('click', handleMainSectionClick)
        }
    }, [IsSideNavOpened])

    return <div style={{ width: "90vw", margin: "0 auto" }}>
        <SideNav />
        <div ref={mainSectionRef} className={IsSideNavOpened ? "blur-[3px]" : "relative blur-0 h-max"}>
            <NavBar />
            <SearchBar />
            <Banner />
            <ItemsSection name={name} max={max} min={min} sortType={sortType} sideNav={IsSideNavOpened} />
            <Footer />
        </div>

    </div>
}

const ItemsSection = memo<ProductSearchParams>(({ name, max, min, sortType }) => {

    const [displayItems, setDisplayItems] = useState<productsStorageType | null>(null)

    useEffect(() => void (async () => setDisplayItems(await getProducts(undefined, name, min, max, sortType)))(), [max, min, sortType, name])

    return displayItems !== null? (
        <div className="flex flex-col justify-center ssm:gap-[5vw]
         sm:flex-row" id="displayItems">
            <SortAndFilter itemsLength={displayItems.size} />
            <DisplayItemsGrid products={displayItems} />
        </div>
    )
        : <h1 className="my-[10vh] text-center">Loading Items</h1>
}, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name &&
        prevProps.max === nextProps.max &&
        prevProps.min === nextProps.min &&
        prevProps.sortType === nextProps.sortType;
});