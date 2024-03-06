// Import des types de données depuis './data'.
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './data';

// Extraction du mode mocké depuis l'URL. Si '?mocked' est présent, 'mocked' est défini à true.
const [, search] = window.location.href.split('?');
export const mocked = search === 'mocked';

export function isUserIdInMockData(userId, dataSource) {
  return dataSource.some(data => data.userId.toString() === userId.toString() || data.id.toString() === userId.toString());
}

// Récupération des données utilisateur selon 'userId' et 'dataSource'.
export async function getUserData(userId, dataSource) { 
  // En mode mocké, retourne les données simulées correspondant au 'userId'.
  if (mocked) {
    const data = dataSource.find(user => user.userId === userId || user.id === userId);
    if (!data) {
      return { notFound: true };
    }
    return data;
  } else {
    // Construction de l'URL API basée sur 'userId' et le type de données demandé.
    let apiUrl = `http://localhost:3000/user/${userId}`;

    // Sélection du chemin API en fonction de 'dataSource'.
    switch (dataSource) {
      case USER_MAIN_DATA:
        break;
      case USER_ACTIVITY:
        apiUrl += "/activity";
        break;
      case USER_AVERAGE_SESSIONS:
        apiUrl += "/average-sessions";
        break;
      case USER_PERFORMANCE:
        apiUrl += "/performance";
        break;
      default:
        // Avertissement si 'dataSource' n'est pas reconnu.
        console.warn("Unrecognized dataSource: ", dataSource);
        return null;
    }

    // Tentative d'appel API et retour des données JSON. Gestion des erreurs.
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Erreur lors de la récupération des données depuis l'API :", err);
      return null;
    }
  }    
}


function formatMainUserData(userData) {
  if (userData && userData.keyData) {
    return {
      ...userData,
      keyData: {
        ...userData.keyData,
        calorieCount: (userData.keyData.calorieCount / 1000).toFixed(3),// Convertit les calories en kcal avec 3 décimales
      },
    };
  }
  return userData; 
}


function extractUserFirstName(userData) {// Fonction de formatage pour extraire le prénom de l'utilisateur
  if (userData && userData.data && userData.data.userInfos) {
    return userData.data.userInfos.firstName;// En mode réel, extrait le prénom depuis userData.data.userInfos
  } else if (userData && userData.userInfos) {// En mode mocké, extrait le prénom depuis userData.userInfos
    return userData.userInfos.firstName;
  }
  return ''; 
}

function formatAverageSessionsData(userData) {
  if (userData && userData.sessions) {
    return userData.sessions.map(session => ({
      ...session,
      sessionLength: session.sessionLength 
    }));
  }
  return []; 
}


function formatPerformanceData(performanceData) {// Fonction de formatage des données de performance
  const kindMapping = {// Mapping des catégories de performance.
    1: 'Cardio',
    2: 'Energie',
    3: 'Endurance',
    4: 'Force',
    5: 'Vitesse',
    6: 'Intensité'
  };
  if (performanceData && performanceData.data) {
    return performanceData.data.map(item => ({
      subject: kindMapping[item.kind], // Conversion des catégories
      value: item.value, // Valeur de performance
      fullMark: 150 // Valeur maximale pour chaque catégorie
    })).reverse(); // Inversion de l'ordre pour correspondre à la maquette
  }
  return []; 
}


function formatActivityData(activityData) {// Fonction de formatage des données d'activité
  if (activityData && activityData.sessions) {
    return activityData.sessions.map(session => ({
      ...session,
      day: session.day, // Jour de la session
      kilogram: session.kilogram, // Poids enregistré ce jour-là
      calories: session.calories // Calories brûlées ce jour-là
    }));
  }
  return []; 
}


function formatUserScore(userData) {// Fonction de formatage pour le score de l'utilisateur
  const scoreValue = userData.todayScore || userData.score;
  return scoreValue ? { name: 'Score', todayScore: scoreValue * 100 } : {};
}

// Fonctions spécifiques pour simplifier les demandes de chaque type de données utilisateur.

export const fetchUserMainData = async (userId) => {
  const userDataResponse = await getUserData(userId, USER_MAIN_DATA);
  const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;

  const userFirstName = extractUserFirstName(userData); 
  const formattedMainData = formatMainUserData(userData); 
  const userScore = formatUserScore(userData); 
  return { ...formattedMainData, userScore, userFirstName };
};


export const fetchUserActivity = async (userId) => {
  const userDataResponse = await getUserData(userId, USER_ACTIVITY);
  const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
  return formatActivityData(userData);
};


export const fetchUserAverageSessions = async (userId) => {
  const userDataResponse = await getUserData(userId, USER_AVERAGE_SESSIONS);
  const userData = userDataResponse.data ? userDataResponse.data : userDataResponse;
  return formatAverageSessionsData(userData);
};

export const fetchUserPerformance = async (userId) => {
  const userDataResponse = await getUserData(userId, USER_PERFORMANCE);
  const userData = mocked ? userDataResponse : userDataResponse.data || userDataResponse;
  return formatPerformanceData(userData);
};
