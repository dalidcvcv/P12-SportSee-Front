// Import des hooks React, react-router-dom et du fichier CSS de la page.
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Accueil.css'

// Import des composants utilisés dans la page.
import MenuTop from '../components/MenuTop/MenuTop'
import MenuLeft from '../components/MenuLeft/MenuLeft'
import Poids from '../components/Poids/Poids'
import Objectifs from '../components/Objectifs/Objectifs'
import Performances from '../components/Performances/Performances'
import Score from '../components/Score/Score'
import Nutrition from '../components/Nutrition/Nutrition'

// Import de la fonction pour récupérer les données.
import { fetchUserMainData } from '../Api/Api.js'

function Accueil () {
  // Initialisation de l'état local pour stocker le prénom de l'utilisateur.
  const [userFirstName, setUserFirstName] = useState('')
  
  // Récupération de userId depuis les paramètres de l'URL.
  let { userId } = useParams()
  userId = +userId // Conversion de userId en nombre.

  // Récupération des données Main de l'utilisateur à partir de l'Api.
  useEffect(() => {
    fetchUserMainData(userId)
      .then(data => {
        setUserFirstName(data.userFirstName);// Màj de l'état avec le prénom de l'utilisateur
      });
  }, [userId]);//à chaque changement d'userId.
  
  // Génération du DOM pour la page.
  return (
    <div className='accueil'>
      <MenuTop userId={userId} /> 
      <section className='sectionContainer'>
        <MenuLeft userId={userId} /> .
        <div className='content'>
          <div className='dashboard__header'>
            <h1>
              Bonjour <span className='nom'>{userFirstName}</span> 
            </h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p> 
          </div>
          <div className='dashboard__content'>
            <div className='dashboard__graphs'>
              <Poids userId={userId} /> 
              <div className='dashboard__graphs__bottom'>
                <Objectifs userId={userId} /> 
                <Performances userId={userId} /> 
                <Score userId={userId} /> 
              </div>
            </div>
            <Nutrition userId={userId} /> 
          </div>
        </div>
      </section>
    </div>
  );    
}

export default Accueil
