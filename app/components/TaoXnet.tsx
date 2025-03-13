"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'

type Props = {
    coldkey: string
}

const TaoXnet = ({ coldkey }: Props) => {
    const { data, error, isLoading } = useSWR(`/api/getTaoXnet?coldkey=${coldkey}`, fetcher)
    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key)
    }
    const showKey = (key: string) => {
        return key.slice(0, 4) + '***' + key.slice(-4)
    }
    const showTaoNumber = (number: number) => {
        const taoNumber = number / 1e9
        return parseFloat(taoNumber.toString()).toFixed(2)
    }
    const showNumber = (number: number, unit: number) => {
        return parseFloat(number.toString()).toFixed(unit)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) {
        console.log({ data })
        return (
            <>
                {
                    data.length && data.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className='text-center'>{item.NETUID}</td>
                            <td className='text-center'>{item.UID}</td>
                            <td className='text-center'>{showTaoNumber(item.stakeTAO)} 𝞃 / {showTaoNumber(item.stakeAlpha)} ε</td>
                            <td className='text-center'>{showNumber(item.incentive, 5)}</td>
                            <td className='text-center'>{showNumber(item.dividends, 5)}</td>
                            <td className='text-center'>{showNumber(item.emission, 5)}</td>
                            <td className='text-center'>{item.axon}</td>
                            <td className='text-center cursor-pointer' onClick={() => copyKey(item.coldkey)}>{showKey(item.coldkey)}</td>
                            <td className='text-center cursor-pointer' onClick={() => copyKey(item.hotkey)}>{showKey(item.hotkey)}</td>
                            <td className='text-center'>{showNumber(item.daily, 2)} 𝞃</td>
                        </tr>
                    ))
                }</>
        )
    }
}

export default TaoXnet