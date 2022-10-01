import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { FaTrash } from 'react-icons/fa'
import { CgSpinnerAlt } from 'react-icons/cg'



export default function TransactionList({transactions}) {
  const { deleteDocument } = useFirestore('transactions')
  let total = 0;
  if(transactions){
    transactions.forEach(transaction => {
      const cost = Number(transaction.amount)
      total += cost
    })
  }

  return (
    <>
        <ul className='w-full flex flex-col gap-4'>    
          { transactions && transactions.length ? transactions.map(transaction => (
                <li key={transaction.id} className='flex justify-between p-6 shadow-lg border-l-4 border-green rounded-r relative'>
                    <p className='text-gray2 font-semibold'>{transaction.name}</p>
                    <p className='text-gray2 font-bold text-xl'>₦{transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)} className='absolute top-0 right-0 bg-gray2 p-[5px] text-white cursor-pointer group transition-all ease-linear duration-200'><FaTrash size={13} className='group-hover:scale-90'/></button>
                </li>
          )) : <p className='font-bold'>View Added Transacations Here...</p>}
          { !transactions && <div className='w-full flex justify-center mt-8'><CgSpinnerAlt className='animate-spin' size={25} /></div>}
        </ul> 
        { (transactions && transactions.length !== 0) && <div className='w-full flex justify-center lg:justify-end mt-8 text-xl font-bold'>
          <p className='text-teal-900'>Total(₦): <span className='text-teal-700'>{total}</span></p>
        </div> }
        
    </>
  )
}
