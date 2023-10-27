/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { mockPayments, mockDataInvoices} from '../data'
import { Box } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      color: 'white'
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // Set the color of x-axis labels to white
        },
        grid: {
          display: false, // Hide the x-axis grid lines if needed
        },
      },
      y: {
        ticks: {
          fontColor: 'white', // Set the color of y-axis labels to white
        },
      },
    },
  },
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels,
  datasets: [
    {
      data: mockDataInvoices.map((item=>item.cost)),
      backgroundColor: 'white',
      barThickness: 10,
      borderRadius: 10,
    },
  ],
};

function BarChart({bgGradient}) {
  return (
    <Box bgGradient={bgGradient} h="13.25rem" position="relative" top={-8} rounded="lg" shadow="lg">
      <Bar options={options} data={data}/>
    </Box>
  );
}

export default BarChart;
