import React from 'react'
import TaoXnet from '../components/TaoXnet'
import TaoSubnets from '../components/TaoSubnets'
import Price from '../components/Price'

const MinePage = () => {
    const coldkeys = [
        "5C8AE3XAGmx9vRMYGdcLYwdSXbk6EAsmhtVCnkFhjV4XxJKq",
        "5HirTJaJRyg595UEGnnj2cF8woxQNe3LR5SRusRMPMp9UGnY",
        "5CcWZNTzcziL1AXrKLLX7RDTuYW54gh5QpJgj9M67TtorWzr",
        "5FH86a6kwcvWPA2WRCiQU17FbUTYauYRvjugYwx1J7KTpYrT",
        "5FF4L75NyhJ333Jbm6r7eKytVbmaTG8xRj8vJ7LbaV1xDN4A",
        "5GTFJrbEXr1x19HwTLG93Swb3JSWsXs5jkSNfBadydVaf9ag",
        "5FUduioEDfg1DWEUf2xYQ7ULo9hAM1fPp3thyitUybDCitpK",
        "5FvV6vtap12HyEy6P3WSVoCFPti6Fc3y3k3vj5Ng5TXgPhVD"
    ]
    return (
        <div className='w-screen px-10'>
            <div className='flex flex-col gap-2 w-full'>
                <Price />
                <table>
                    <thead>
                        <tr>
                            <th>SNID</th>
                            <th>UID</th>
                            <th>STAKE</th>
                            <th>INCENTIVE</th>
                            <th>DIVIDENDS</th>
                            <th>EMISSION</th>
                            <th>AXON</th>
                            <th>COLDKEY</th>
                            <th>HOTKEY</th>
                            <th>DAILY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coldkeys.map((coldkey, index) => (
                                <TaoXnet coldkey={coldkey} key={index} />
                            ))
                        }
                    </tbody>
                </table>
                <TaoSubnets />
            </div>
        </div>
    )
}

export default MinePage