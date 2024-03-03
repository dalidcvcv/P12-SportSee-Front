// Import des types de données depuis './data'.
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './data';

// Extraction du mode mocké depuis l'URL. Si '?mocked' est présent, 'mocked' est défini à true.
const [, search] = window.location.href.split('?');
export const mocked = search === 'mocked';

// Récupération des données utilisateur selon 'userId' et 'dataSource'.
export async function getUserData(userId, dataSource) { 
  // En mode mocké, retourne les données simulées correspondant au 'userId'.
  if (mocked) {
    const data = dataSource.find(user => user.userId === userId || user.id === userId);
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

// Fonctions spécifiques pour simplifier les demandes de chaque type de données utilisateur.
export const fetchUserMainData = async (userId) => {
  return getUserData(userId, USER_MAIN_DATA);
};

export const fetchUserActivity = async (userId) => {
  return getUserData(userId, USER_ACTIVITY);
};

export const fetchUserAverageSessions = async (userId) => {
  return getUserData(userId, USER_AVERAGE_SESSIONS);
};

export const fetchUserPerformance = async (userId) => {
  return getUserData(userId, USER_PERFORMANCE);
};
