import React, { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp'
import { CgSpinnerAlt } from 'react-icons/cg'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [ showPassword, setShowPassword] = useState(false)
  const { signUp, isPending, error } = useSignUp()

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName)
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <section className='pt-8'>
      <div className='container mx-auto px-4'>
        <form className='max-w-[360px] p-4 mx-auto' onSubmit={handleSubmit}>
          <h2 className='font-semibold text-lg mb-4'>Sign Up</h2>
          <label className='flex flex-col gap-1 mb-4'>
            <span>Email:</span>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='px-4 text-gray2 focus:outline-none border border-gray2 rounded py-1' />
          </label>
          <label className='flex flex-col gap-1 mb-4 relative'>
            <span>Password:</span>
            <input type={ showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} className='px-4 text-gray2 focus:outline-none border border-gray2 rounded py-1' />
            { showPassword ? <AiFillEyeInvisible className='absolute right-0 top-8 mr-2 text-gray2' size={28} onClick={handleShowPassword} /> : <AiFillEye className='absolute right-0 top-8 mr-2 text-gray2' size={28} onClick={handleShowPassword} />}
          </label>
          <label className='flex flex-col gap-1 mb-4'>
            <span>Display Name:</span>
            <input type='text' onChange={(e) => setDisplayName(e.target.value)} value={displayName} className='px-4 text-gray2 focus:outline-none border border-gray2 rounded py-1' />
          </label>
          
          { isPending ? <button className='w-full border-2 border-green text-green rounded py-1 hover:bg-green hover:text-white flex justify-center' disabled><CgSpinnerAlt className='animate-spin' size={25} /></button> : <button className='w-full text-center border-2 border-green text-green rounded py-1 hover:bg-green hover:text-white transition-all ease-linear duration-200'>Sign Up</button> }
          { error && <p className='text-red-600 text-center mt-4'>{error}</p>}
        </form>
      </div>
      <div className='text-center text-sm mt-[16rem]'>
        Coded by <a href="https://github.com/oluwajuwonomoyele" className='text-green font-bold animate-pulse'>Olutomisin Oluwajuwon</a>
      </div>
    </section>
  )
}
