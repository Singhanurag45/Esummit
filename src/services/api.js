import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchSchemes = async () => {
  try {
    const response = await axios.get(`${API_URL}/schemes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }
};

export const checkEligibility = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/check-eligibility`, userDetails);
    return response.data.eligibleSchemes;
  } catch (error) {
    console.error('Error checking eligibility:', error);
    throw error;
  }
};

export const fetchLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const fetchTranslations = async () => {
  try {
    const response = await axios.get(`${API_URL}/translations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};