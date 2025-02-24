"use client"
import React from 'react'
import ValidateItem from './ValidateItem'
type Props = {
    miners: number[]
}
const Validate = ({miners}: Props) => {
    return (
        <div className='flex flex-col gap-5 p-10 border border-white rounded-2xl justify-center items-center'>
            <div className='text-2xl font-bold text-center'>Validate</div>
            <div className='flex flex-col gap-1'>
                {
                    miners?.map((miner, index) => <ValidateItem key={index} miner={miner} />)
                }
            </div>
        </div>
    )
}

export default Validate