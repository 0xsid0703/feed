"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        tooltip: {
            mode: 'nearest', // Show only the nearest point
            intersect: true, // Only show the tooltip when directly hovering over a point
            callbacks: {
                label: function (tooltipItem: any) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Show only the selected point's value
                }
            }
        }
    },
    hover: {
        mode: 'dataset', // Ensures hover highlights a dataset
        intersect: false,
        onHover: (event: any, elements: any, chart: any) => {
            if (elements.length) {
                const hoveredDatasetIndex = elements[0].datasetIndex;
                chart.data.datasets.forEach((dataset: any, index: number) => {
                    dataset.borderColor = index === hoveredDatasetIndex 
                        ? dataset.originalBorderColor 
                        : `rgba(200, 200, 200, 0.2)`;
                    dataset.backgroundColor = index === hoveredDatasetIndex 
                        ? dataset.originalBackgroundColor 
                        : `rgba(200, 200, 200, 0.2)`;
                });
                chart.update();
            } else {
                chart.data.datasets.forEach((dataset: any) => {
                    dataset.borderColor = dataset.originalBorderColor;
                    dataset.backgroundColor = dataset.originalBackgroundColor;
                });
                chart.update();
            }
        }
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 4,
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: true, // Ensures only the hovered point is considered
        axis: 'x',
    },
};

type Props = {
    selectedDay: number,
    mm: string
}

const RecentScore = ({ selectedDay, mm }: Props) => {
    const { data, error, isLoading } = useSWR(`/api/getScores?day=${selectedDay}&miners=${mm}`, fetcher)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) {
        console.log(data)
        const labels = data[0].Date
        const dataset = data.map((item: any) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const borderalpha = 0.5;
            const bgalpha = 0.9;

            return {
                label: `Miner ${item.UID}`,
                data: item.Score,
                borderColor: `rgba(${r}, ${g}, ${b}, ${borderalpha})`,
                backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgalpha})`,
            }
        })
        const line = {
            labels,
            datasets: dataset
        }
        console.log({ line })
        return (
            <div className='w-full'><Line options={options} data={line} /></div>
        )
    }
}

export default RecentScore