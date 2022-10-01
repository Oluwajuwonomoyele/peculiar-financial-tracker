import React from 'react';
import Form from './Form';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import TransactionList from './TransactionList';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [welcome, setWelcome] = useState(true)
  const { user } = useAuthContext()
  const { documents, error } = useCollection('transactions', ['uid', '==', user.uid], ['createdAt', 'desc'])

  useEffect(() => {
    if(user){
      setTimeout(() => {
          setWelcome(false)
      }, 3000)
    }
  }, [])

  if(welcome){
    return (
      <div className='h-[85vh] w-screen flex justify-center items-center'>
        <h1 className='text-2xl font-bold animate-bounce'>Welcome, <span className='text-green animate-pulse'>{user.displayName}</span></h1>
      </div>
    )
  }

  return (
    <section className='pt-8'>
      <div className='mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_2fr] max-w-[1000px] gap-8'>
        <div>
          <Form uid={user.uid}/>
        </div>

        <div>
          { !error ? <TransactionList transactions={documents}/> : <p>{error}</p>}
        </div>
      </div>
    </section>
  )
}
