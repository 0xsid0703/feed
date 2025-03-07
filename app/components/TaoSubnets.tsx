"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'
import clsx from 'clsx'

const TaoSubnets = () => {
    const { data, error, isLoading } = useSWR('/api/getSubnets', fetcher)
    const showTaoNumber = (number: number) => {
        return parseFloat(number.toString()).toFixed(5)
    }
    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log({error})
        return <div>Error loading data</div>}
    if (data) {
        return (
            <div className='w-full'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr>
                            <th>SNID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>1d %</th>
                            <th>7d &</th>
                            <th>Market Cap</th>
                            <th>Volume (1d)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item: any, index: number) => (
                                [0, 14, 44, 50, 63, 65, 66, 67, 68, 71, 72, 73].includes(item.subnet) && <tr key={index}>
                                    <td className='text-center'>{item.subnet}</td>
                                    <td className='text-center'>{item.name} {item.letter}</td>
                                    <td className='text-center'>𝞃 {showTaoNumber(item.price)}</td>
                                    <td className={clsx(item.price_difference_day > 0 ? "text-green-500 text-center" : "text-red-500 text-center")}>{showTaoNumber(item.price_difference_day)} %</td>
                                    <td className={clsx(item.price_difference_week > 0 ? "text-green-500 text-center" : "text-red-500 text-center")}>{showTaoNumber(item.price_difference_week)} %</td>
                                    <td className='text-center'>𝞃 {showTaoNumber(item.market_cap)}</td>
                                    <td className='text-center'>𝞃 {showTaoNumber(item.volume_1d)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TaoSubnets