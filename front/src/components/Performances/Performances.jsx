import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { fetchUserPerformance } from '../../Api/Api';
import './Performances.css';

function UserRadarChart({ userId }) {
  // Initialisation du state pour stocker les données 'performance'.
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    
    const fetchPerformanceData = async () => {// Récupération et màj des données de performance formatées
      try {
        const formattedData = await fetchUserPerformance(userId);
        setPerformanceData(formattedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données performances:', error);
      }
    };
  
    // Appel de la fonction pour charger les données.
    fetchPerformanceData();
  }, [userId]); // Dépendance de useEffect sur userId.
  

  // Si aucune donnée n'est disponible, afficher ce message.
  if (performanceData.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  // Génération du DOM pour le composant.
  return (
    <div className='performance_graph'>
      <ResponsiveContainer width="100%" aspect={258 / 263}>
        <RadarChart outerRadius="60%" data={performanceData} cx="50%" cy="50%" margin={{ top: 20, right: 15, bottom: 20, left: 15 }}>
          <PolarGrid /> 
          <PolarAngleAxis dataKey="subject" stroke='#FFFFFF' dy={2.5} tickLine={false} fontSize={11} /> 
          <Radar name="Performance" dataKey='value' fill='#E60000' fillOpacity={0.8} /> 
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserRadarChart;
