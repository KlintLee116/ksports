"use client"

import { useIsSideNavOpened } from '@/global/general'
import { useRouter } from 'next/navigation'

export default () => {

    const {setIsSideNavOpened} = useIsSideNavOpened()
    // let currUserEmail: null | string = ''

    // if (typeof window !== 'undefined') {
    //     currUserEmail = localStorage.getItem('currUserEmail')
    // }

    const router = useRouter();

    // const UserProfileComponents =
    //     currUserEmail ?
    //         <div className='hidden sm:inline-block'>
    //             <h4 className='m-0 text-center'>Signed in as</h4>
    //             <h4 className='m-0 text-center'>{currUserEmail}</h4>
    //         </div>
    //         :
    //         <div className='hidden sm:inline-block'>
    //             <button className='bg-transparent cursor-pointer' style={{ borderRadius: "8px", padding: "0.6em 1.2em", fontWeight: 500 }}
    //                 onClick={() => router.push("/SignUpLogin?action=SignUp")}>Sign Up</button>
    //             <button className='bg-transparent cursor-pointer' style={{ borderRadius: "8px", padding: "0.6em 1.2em", fontWeight: 500 }}
    //                 onClick={() => router.push("/SignUpLogin?action=login")}>Login</button>
    //         </div>

    return (
        <nav className="flex justify-between items-center py-4 px-0">
            <img className="navIcons" width={500} height={500} alt="menu-button" onClick={() => setIsSideNavOpened(true)} src={'/icons/hamburger.png'} />

            <h3 onClick={() => router.push('/')} className="cursor-pointer bg-blue-600 absolute left-1/2 px-4 py-2 text-white transform -translate-x-1/2">K Sports</h3>

            <div className="flex items-center gap-[2vw]">
                {/* {UserProfileComponents} */}
                <img alt='cart' className="navIcons" src='/icons/cart.png'
                    onClick={() => router.push("/checkout")} />
            </div>

        </nav>
    )
}