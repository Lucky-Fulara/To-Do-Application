import axios from 'axios';

const API_KEY = '2da6be3cef03d0c2751474dc505b57c9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    return {
      temp: response.data.main.temp,
      condition: response.data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getCities = async (search: string) => {
  try {
    const response = await axios.get(
      `${GEO_URL}/direct?q=${encodeURIComponent(search)}&limit=5&appid=${API_KEY}`
    );
    return response.data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};