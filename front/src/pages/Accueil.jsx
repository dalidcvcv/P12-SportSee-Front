import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Accueil.css'
import MenuTop from '../components/MenuTop/MenuTop'
import MenuLeft from '../components/MenuLeft/MenuLeft'
import Poids from '../components/Poids/Poids'
import Objectifs from '../components/Objectifs/Objectifs'
import Performances from '../components/Performances/Performances'
import Score from '../components/Score/Score'
import Nutrition from '../components/Nutrition/Nutrition'
import { fetchUserMainData } from '../Api/Api.js'

function Accueil () {
  const [userFirstName, setUserFirstName] = useState('')
  
  let { userId } = useParams()
  userId = +userId

  useEffect(() => {
    fetchUserMainData(userId)
      .then(userData => {
        if (userData && userData.data && userData.data.userInfos) {
          // en mode réel
          setUserFirstName(userData.data.userInfos.firstName);
          
        } else if (userData && userData.userInfos) {
                    // en mode mocké
                    setUserFirstName(userData.userInfos.firstName);
                } else {
                }
            });
    }, [userId]);
 
    return (
      <div className='accueil'>
        <MenuTop userId={userId} />
        <section className='sectionContainer'>
          <MenuLeft userId={userId} />
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
