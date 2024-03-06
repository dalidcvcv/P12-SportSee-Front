import React, { useState, useEffect } from 'react';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Poids.css'
import { fetchUserActivity } from '../../Api/Api.js'; 

function Barchart({ userId }) {
  // Initialisation du state pour stocker les données 'activité'.
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    async function getActivityData() {
      try {
        const formattedData = await fetchUserActivity(userId);// Récupération et màj des données 'activité'
        setActivityData(formattedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données poids', error);
      }
    }
  
    // Appel de la fonction de récupération des données.
    getActivityData();
  }, [userId]); 
  
  // Retourne un message d'indisponibilité si pas de donnée activité.
  if (activityData.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }

  return (
    <div className='activity_graph'>
      <h2>Activité quotidienne</h2>
      <ResponsiveContainer minWidth={'100%'} aspect={22.75 / 9}>
      <BarChart  data={activityData} barGap={8} margin={{top: 100,right: 30,left: 30,bottom: 20}}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis dataKey='day' tickLine={false} axisLine={false} tickFormatter={(value, index) => index + 1} padding={{ left: -35, right: -35 }} tickMargin={15} tick={{ fontSize: 14 }}/>
          <YAxis dataKey='kilogram' type='number' tickLine={false} orientation='right' axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} tickMargin={40} tick={{ fontSize: 14 }} />
          <YAxis dataKey='calories' type='number' yAxisId='calorie' hide />
        <Tooltip 
      content={({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className='activity-tooltip'>
              <p>{`${payload[0].value}kg`}</p>
              <p>{`${payload[1].value}kCal`}</p>
            </div>
          );
        }
        return null;
      }}
    />
        <Legend verticalAlign='top' align='right' iconType='circle' wrapperStyle={{ top: 15, right: 25 }} formatter={(value) => <span className='legendText'>{value}</span>} iconSize={10}/>
        <Bar name='Poids (kg)' dataKey='kilogram' radius={[10, 10, 0, 0]} barSize={7} fill='#282D30' />
        <Bar name='Calories brûlées (kCal)' dataKey='calories' radius={[10, 10, 0, 0]} barSize={7} yAxisId='calorie' fill='#E60000' />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
