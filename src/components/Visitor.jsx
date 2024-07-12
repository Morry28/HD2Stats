// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [visitorData, setVisitorData] = useState(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setVisitorData(response.data);
      } catch (error) {
        console.error('Error fetching visitor data', error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <div className='bg-BG'>
      <h1>Welcome to My Site</h1>
      {visitorData ? (
        <div>
          <p>IP: {visitorData.ip}</p>
          <p>City: {visitorData.city}</p>
          <p>Region: {visitorData.region}</p>
          <p>Country: {visitorData.country_name}</p>
          <p>Latitude: {visitorData.latitude}</p>
          <p>Longitude: {visitorData.longitude}</p>
          <p>ISP: {visitorData.org}</p>
        </div>
      ) : (
        <p>Loading visitor data...</p>
      )}
    </div>
  );
};

export default App;
