
// import { useState } from 'react';
// import axios from 'axios';
// import { OPENAI_API_KEY } from '@env';

// export const RecipeAI = () => {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   //actual api call from gpt
//   const sendRequest = async (messages) => {
//     setLoading(true);
//     try {
//       const result = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         { model: 'gpt-3.5-turbo', messages },
//         { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
//       );
//       console.log("API Response:", result.data);
//       setResponse(result.data.choices[0].message.content);
//     } catch (err) {
//       console.error('Error fetching cooking instructions from OpenAI:', err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return { response, loading, error, sendRequest };
// };

import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OPENAI_API_KEY } from '@env';

export const RecipeAI = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(''); // Track the source of the data

  const sendRequest = async (messages) => {
    const cacheKey = `ai-response-${JSON.stringify(messages)}`;
    setLoading(true);
    try {
      // First, try to get the data from the local cache
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (cachedData) {
        console.log("Retrieved from cache");
        setResponse(JSON.parse(cachedData));
        setSource('cache'); // Data came from cache
      } else {
        // If not in cache, make the API call
        const result = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          { model: 'gpt-3.5-turbo', messages },
          { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
        );
        console.log("API Response:", result.data);
        setResponse(result.data.choices[0].message.content);
        setSource('api'); // Data came from API
        await AsyncStorage.setItem(cacheKey, JSON.stringify(result.data.choices[0].message.content));
      }
    } catch (err) {
      console.error('Error fetching cooking instructions from OpenAI:', err);
      setError(err);
      setSource('error');
    } finally {
      setLoading(false);
    }
  };
  
  return { response, loading, error, sendRequest, source };
};
