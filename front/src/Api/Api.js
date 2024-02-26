import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './data';

// Extraction du mode mocké depuis l'URL
const [, search] = window.location.href.split('?');
export const mocked = search === 'mocked';

export async function getUserData(userId, dataSource) { 
  if (mocked) {
    const data = dataSource.find(user => user.userId === userId || user.id === userId);
    return data;
  } else {
    let apiUrl = `http://localhost:3000/user/${userId}`;

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
        console.warn("Unrecognized dataSource: ", dataSource);
        return null;
    }

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
