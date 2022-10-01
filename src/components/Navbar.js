import React from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <header className='bg-gray1'>
        <div className='container mx-auto p-4 flex items-center justify-between'>
          <Link to='/' className='font-semibold lg:text-xl cursor-pointer'>
            Peculiar<span className='text-green'>Tracker</span>.
          </Link>

          <div className='flex gap-2 items-center lg:gap-8'>
            { user ? <>
              <p className='text-[10px] lg:text-base hidden lg:block'>Hello, <span className='text-green'>{user.displayName}</span></p>
              <button className='cursor-pointer text-sm font-semibold border border-green py-1 px-2 text-green rounded hover:bg-green hover:text-white' onClick={() => logout()}>Log Out</button>
            </> : <>
            <Link to='/login' className='cursor-pointer text-sm font-semibold border-2 border-green py-1 px-2 text-green rounded hover:bg-green hover:text-white transition-all ease-linear duration-200'>Log In</Link>
            </>}
          </div>
        </div>
    </header>
  )
}
