import { getCurrentTime } from './dateUtils';

export const saveToLocalStorage = (userId, key, data) => {
    if (!userId) return;
    const fullKey = `${userId}_${key}`;
    const dataToStore = {
      timestamp: getCurrentTime(),
      data
    };
    localStorage.setItem(fullKey, JSON.stringify(dataToStore));
};
  
export const loadFromLocalStorage = (userId, key) => {
    if (!userId) return null;
    const fullKey = `${userId}_${key}`;
    const storedData = localStorage.getItem(fullKey);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
};
