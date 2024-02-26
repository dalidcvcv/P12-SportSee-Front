import React, { useState, useEffect } from 'react';
import { RadialBar, RadialBarChart, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './Score.css';
import { fetchUserMainData } from '../../Api/Api';

function ScoreChart({ userId }) {
  const [userScore, setUserScore] = useState([]);
  useEffect(() => {
    async function getUserScore() {
      try {
        const userDataResponse = await fetchUserMainData(userId);
        const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
        
        const scoreValue = userData.todayScore || userData.score;
  
        if (scoreValue) {
          setUserScore([{ name: 'Score', todayScore: scoreValue * 100 }]);
        } 
      } catch (error) {
        console.error('Erreur lors de la récupération du score :', error);
      }
    }
  
    getUserScore();
  }, [userId]);

  if (userScore.length === 0) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  const RenderLegend = () => {
    const score = userScore.length > 0 ? userScore[0].todayScore : 0;

    return (
      <div className="custom-legend" style={{ textAlign: 'center' }}>
        <span className="legend-score">{score}%</span>
        <p>de votre <br></br>objectif</p>
      </div>
    );
  };

  return (
    <div className='score_graph'>
      <h2> Score </h2>
      <ResponsiveContainer width='100%' aspect={258 / 263}>
      <RadialBarChart cx='50%' cy='50%' innerRadius="75%" outerRadius="85%" startAngle={90} endAngle={450} barSize={10} data={userScore} style={{ backgroundColor: '#FFFFFF', clipPath: 'circle(37.5% at 50% 50%)' }} >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} fill="#FF0000" />
          <RadialBar minAngle={100} background={{ fill: '#FBFBFB' }} cornerRadius={5} clockWise={true} dataKey='todayScore' angleAxisId={0} fill='#FF0000' style={{ zIndex: 5 }} />
          <Legend content={<RenderLegend />} layout="vertical" verticalAlign="middle" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScoreChart;
