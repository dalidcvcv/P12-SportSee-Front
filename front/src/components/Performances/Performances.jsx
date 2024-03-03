import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { fetchUserPerformance, mocked } from '../../Api/Api';
import './Performances.css';

function UserRadarChart({ userId }) {
  // Initialisation du state pour stocker les données 'performance'.
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Mapping des catégories de performance.
    const kindMapping = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité'
    };
  
    // Traitement et formatage les données.
    const processPerformanceData = (data) => {
      return data.map(item => ({
        subject: kindMapping[item.kind], // Conversion des catégories.
        value: item.value, // Valeur de performance.
        fullMark: 150 // Valeur maximale pour chaque catégorie.
      })).reverse(); // Inversion de l'ordre pour correspondre à la maquette.
    };
  
    // Récupération des données de performance depuis l'API.
    const fetchPerformanceData = async () => {
      try {
        const userDataResponse = await fetchUserPerformance(userId);
        // Gestion du mode mocké pour la récupération des données.
        const userData = mocked ? userDataResponse : userDataResponse.data || userDataResponse;
  
        // Màj du state 'performanceData' avec les données de 'userData.data
        if (userData && userData.data) {
          const formattedData = processPerformanceData(userData.data);
          setPerformanceData(formattedData);
        } 
      } catch (error) {
        // Gestion des erreurs lors de la récupération des données.
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
