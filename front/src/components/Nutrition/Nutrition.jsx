import React, { useEffect, useState } from 'react';
import { fetchUserMainData } from '../../Api/Api.js'
import './Nutrition.css';
import calorie from '../../assets/calorie.svg';
import proteine from '../../assets/proteine.svg';
import glucide from '../../assets/glucide.svg';
import lipide from '../../assets/lipide.svg';

const Nutrition = ({ userId }) => {
  const [keyData, setKeyData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const userDataResponse = await fetchUserMainData(userId);
      const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
      
      if (userData && userData.keyData) {
        setKeyData({
          ...userData.keyData,
          calorieCount: (userData.keyData.calorieCount / 1000).toFixed(3)
        });
      } else {
        console.error("Pas de données nutrition", userId);
      }
    }
  
    fetchUserData();
  }, [userId]);
  
  if (!keyData) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  return (
    <div className='keyDatas__container'>
      <div className='keyData'>
        {[
          { icon: calorie, quantity: keyData.calorieCount, nutrient: 'Calories' },
          { icon: proteine, quantity: keyData.proteinCount, nutrient: 'Protéines' },
          { icon: glucide, quantity: keyData.carbohydrateCount, nutrient: 'Glucides' },
          { icon: lipide, quantity: keyData.lipidCount, nutrient: 'Lipides' }
        ].map((item, index) => (
          <div key={index} className='information-card'>
            <div className='icon-container'>
              <img src={item.icon} alt={item.nutrient} />
            </div>
            <div className='nutrient-details'>
              <div className='quantity'>{`${item.quantity}${item.nutrient === 'Calories' ? 'kCal' : 'g'}`}</div>
              <div className='nutrient'>{item.nutrient}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
