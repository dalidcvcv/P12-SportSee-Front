import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { fetchUserPerformance, mocked } from '../../Api/Api';
import './Performances.css';

function UserRadarChart({ userId }) {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const kindMapping = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité'
    };
  
    const processPerformanceData = (data) => {
      return data.map(item => ({
        subject: kindMapping[item.kind],
        value: item.value,
        fullMark: 150 
      })).reverse(); 
    };
  
    const fetchPerformanceData = async () => {
      try {
        const userDataResponse = await fetchUserPerformance(userId);
        const userData = mocked ? userDataResponse : userDataResponse.data || userDataResponse;
  
        if (userData && userData.data) {
          const formattedData = processPerformanceData(userData.data);
          setPerformanceData(formattedData);
        } 
      } catch (error) {
        console.error('Erreur lors de la récupération des données performances:', error);
      }
    };
  
    fetchPerformanceData();
  }, [userId]); // Dépendance à userId pour recharger les données si userId change
  

  if (performanceData.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  return (
    <div className='performance_graph'>
      <ResponsiveContainer width="100%" aspect={258 / 263}> 
      <RadarChart outerRadius="60%" data={performanceData} cx="50%" cy="50%" margin={{ top: 20, right: 15, bottom: 20, left: 15 }} >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" stroke='#FFFFFF' dy={2.5} tickLine={false} fontSize={11} />
          <Radar name="Performance" dataKey='value' fill='#E60000' fillOpacity={0.8} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserRadarChart;
