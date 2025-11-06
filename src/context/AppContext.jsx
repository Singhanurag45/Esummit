import { createContext, useState, useEffect, useContext } from 'react';
import { fetchTranslations, fetchLocations } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const [translations, setTranslations] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [translationsData, locationsData] = await Promise.all([
          fetchTranslations(),
          fetchLocations()
        ]);
        
        setTranslations(translationsData);
        setLocations(locationsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load application data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const value = {
    language,
    setLanguage,
    translations,
    locations,
    loading,
    error
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};