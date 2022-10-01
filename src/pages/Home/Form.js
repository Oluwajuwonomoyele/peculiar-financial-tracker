import { useEffect, useState  } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { CgSpinnerAlt } from 'react-icons/cg'


export default function Form({uid}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({uid, name, amount}) 
    }

    useEffect(() => {
        if(response.success){
            setName('')
            setAmount('')
        }
    }, [response.success])

  return (
    <>
        <h3 className='text-green text-lg font-semibold'>Add a Transaction</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-green px-4 py-8 rounded mt-4'>
            <label className='flex flex-col gap-2'>
                <span className='text-white'>Transaction name:</span>
                <input type="text" required onChange={(e) => setName(e.target.value)} value={name} className='rounded focus:outline-none px-3 py-1' />
            </label>
            <label className='flex flex-col gap-2'>
                <span className='text-white'>Amount (₦):</span>
                <input type="number" required onChange={(e) => setAmount(e.target.value)} value={amount} className='rounded focus:outline-none px-3 py-1' />
            </label>
            { response.isPending ? <button className='border-2 border-white text-white rounded py-1 cursor-pointer flex justify-center' disabled><CgSpinnerAlt className='animate-spin' size={25} /></button> : <button className='border-2 border-white text-white rounded py-1 cursor-pointer transition-all ease-linear duration-200 hover:font-bold'>Add Transation</button>}
        </form>
    </>
  )
}
