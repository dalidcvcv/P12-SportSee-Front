import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from 'recharts';
import './Objectifs.css'
import { fetchUserAverageSessions } from '../../Api/Api.js'

// Définition du composant AverageSessionsChart avec 'userId' en prop.
function AverageSessionsChart ({ userId }) {
  // Initialisation du state pour stocker les sessions moyennes.
  const [averageSessions, setAverageSessions] = useState([])
  // Tableau contenant les lettres des jours de semaine pour l'axe X.
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  // Utilisation de useEffect pour récupérer les données des sessions dès que userId change.
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données.
    async function getAverageSessionsData() {
      try {
        // Appel de l'API pour récupérer les données.
        const userDataResponse = await fetchUserAverageSessions(userId);
        // // Gestion de la réponse pour extraire les données.
        const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
  
        // Màj du state 'averageSessions' si 'userData.sessions' est disponible.
        if (userData && userData.sessions) {
          const formattedData = userData.sessions.map(session => ({
            ...session,
            sessionLength: session.sessionLength // Copie de chaque session avec sa durée.
          }));
          setAverageSessions(formattedData);
        } 
      } catch (error) {
        // Gestion des erreurs lors de la récupération des données.
        console.error('Erreur lors de la récupération des données de sessions moyennes:', error);
      }
    }
  
    // Appel de la fonction pour récupérer les données.
    getAverageSessionsData();
  }, [userId]); // Dépendance de useEffect sur userId.
  
  // Si aucune donnée n'est disponible, afficher ce message.
  if (averageSessions.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  // Définition de l'infobulle pour la personnaliser.
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sessionLength = payload[0].value;
      return (
        <div className='custom-tooltip-objectif'>
          <p>{`${sessionLength} min`}</p> 
        </div>
      );
    }
    return null; 
  }

  // Définition d'un curseur personnalisé.
  const CustomCursor = ({ points }) => {
    return (
      <Rectangle fill='#000000' opacity={0.2} x={points[0].x} width={300} height={300} />
    );
  }
 
  // Génération du DOM pour le composant.
  return (
    <div className='average_session_graph'>
      <h2> Durée moyenne des sessions </h2>
      <ResponsiveContainer width='100%' aspect={258 / 263}>
        <LineChart data={averageSessions} margin={{ top: 50, right: 10, left: 10, bottom: 10 }} >
          <XAxis dataKey='day' stroke='#FFFFFF' tickLine={false} axisLine={false} tickFormatter={value => daysOfWeek[value - 1]} interval={0} tick={{ fontSize: 12 }} opacity={0.6} />
          <YAxis hide={true} domain={['dataMin-10', 'dataMax + 5']} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} offset={-60} />
          <Line type='natural' dataKey='sessionLength' stroke='#FFFFFF' dot={false} strokeWidth={2} legendType='none'/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AverageSessionsChart
