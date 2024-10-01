import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const PetChart = ({ energyData, healthData }) => {
  const currentEnergy = energyData[energyData.length - 1];  
  const currentHealth = healthData[healthData.length - 1];  

  
  const energyColor = currentEnergy <= 2 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)';  
  const healthColor = currentHealth <= 2 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(255, 159, 64, 0.6)';  

  const data = {
    labels: ['Энергия', 'Здоровье'],
    datasets: [
      {
        label: 'Состояние питомца',
        data: [currentEnergy, currentHealth], 
        backgroundColor: [
          energyColor, 
          healthColor,  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Энергия и здоровье питомца',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default PetChart;