"use client"

import { useIsSideNavOpened } from '@/global/general';
import './SideNav.css'
import { useRouter } from 'next/navigation'

export default function SideNav() {

    const router = useRouter();
    const {IsSideNavOpened, setIsSideNavOpened} = useIsSideNavOpened()

    const handleAsideProductsMenuClick = (linkTo: string) => {

        setIsSideNavOpened(false)
        if (linkTo !== '/') {
            router.push('/trackmyorder')
        }
    }

    function AsideProductsNavLink({ displayText, linkTo }: {
        displayText: string, linkTo: string
    }) {
        return <h3 className='hover:cursor-pointer hover:after:w-full
        mb-[4vh] w-fit text-2xl' style={{ textDecoration: "none" }} onClick={() => handleAsideProductsMenuClick(linkTo)}
        > {displayText}</h3 >
    }

    return (
        <aside className={`fixed left-0 top-0 bottom-0 overflow-hidden transition-all duration-300
        py-[10vh] px-[0]
         ${IsSideNavOpened ?
                'z-20 px-[2vw] border-0 bg-cyan-300 w-full sm:w-fit' : 'w-0'}`}>
            <AsideProductsNavLink key={"HOME"} linkTo="/" displayText='HOME' />
            <AsideProductsNavLink key={"tmo"} linkTo="/trackmyorder" displayText='TRACK MY ORDER' />
        </aside >
    )
}