import Link from 'next/link'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from '../context/AuthContext';


const AccountNavbar = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='bg-white text-gray-900'>
            <div className='max-w-7xl mx-auto flex justify-between p-10'>
                <div className='flex gap-10 items-center'>
                    <Link href={'/'}>
                        <h2 className='font-bold text-3xl '>Halwany</h2>
                    </Link>
                    <ul className='flex gap-4'>
                        <li><Link href={'/'}>shop</Link></li>

                        <li><Link href={'/order'}>Order</Link></li>
                    </ul>
                </div>

                <div className='flex items-center gap-10'>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {authUser?.user?.email || 'Account'}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    localStorage.removeItem("karfora-user");
                                    window.location.href = "/login";
                                }}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )
}

export default AccountNavbar