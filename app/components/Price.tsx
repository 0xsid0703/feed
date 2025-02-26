"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'

const Price = () => {
    const { data, error, isLoading } = useSWR('/api/getPrice', fetcher)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading price</div>
    if (data) {
        const taoPrice = data.find((price: { symbol: string; }) => price.symbol === 'TAOUSDT').price
        const btcPrice = data.find((price: { symbol: string; }) => price.symbol === 'BTCUSDT').price
        return (
            <div className='w-full flex flex-row gap-5 justify-center items-center'>
                <span>BTC: ${btcPrice}</span>
                <span>TAO: ${taoPrice}</span>
            </div>
        )
    }
}

export default Price