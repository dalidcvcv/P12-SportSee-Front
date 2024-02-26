import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from 'recharts';
import './Objectifs.css'
import { fetchUserAverageSessions } from '../../Api/Api.js'

function AverageSessionsChart ({ userId }) {
  const [averageSessions, setAverageSessions] = useState([])
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  useEffect(() => {
    async function getAverageSessionsData() {
      try {
        const userDataResponse = await fetchUserAverageSessions(userId);
        const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
  
        if (userData && userData.sessions) {
          const formattedData = userData.sessions.map(session => ({
            ...session,
            sessionLength: session.sessionLength
          }));
          setAverageSessions(formattedData);
        } 
      } catch (error) {
        console.error('Erreur lors de la récupération des données de sessions moyennes:', error);
      }
    }
  
    getAverageSessionsData();
  }, [userId]); 
  
  if (averageSessions.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sessionLength = payload[0].value
      return (
        <div className='custom-tooltip-objectif'>
          <p>{`${sessionLength} min`}</p>
        </div>
      )
    }
    return null
  }

  const CustomCursor = ({ points }) => {
    return (
      <Rectangle fill='#000000' opacity={0.2} x={points[0].x} width={300} height={300} />
    )
  }
 
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
