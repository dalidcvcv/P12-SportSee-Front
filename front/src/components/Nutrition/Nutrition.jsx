import React, { useEffect, useState } from 'react';
import { fetchUserMainData } from '../../Api/Api.js'
import './Nutrition.css';
import calorie from '../../assets/calorie.svg';
import proteine from '../../assets/proteine.svg';
import glucide from '../../assets/glucide.svg';
import lipide from '../../assets/lipide.svg';

// Définition du composant Nutrition avec 'userId' en prop.
const Nutrition = ({ userId }) => {
  // Initialisation du state 'keyData' pour stocker les données.
  const [keyData, setKeyData] = useState(null);

  // Utilisation de useEffect pour récupérer les données nutritionnelles de l'utilisateur.
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await fetchUserMainData(userId);
        if (userData && userData.keyData) {
          setKeyData(userData.keyData); // Màj du state 'keyData' 
        } 
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
      }
    }
  
    // Appel de la fonction fetchUserData.
    fetchUserData();
  }, [userId]); // Dépendance de useEffect sur userId.
  
  // Si 'keyData' est null, affiche ce message.
  if (!keyData) {
    return <div>Aucune donnée disponible.</div>;
  }
  
  // Génération du DOM pour le composant.
  return (
    <div className='keyDatas__container'>
      <div className='keyData'>
        {[
          // Mapping des données pour générer les cartes.
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
