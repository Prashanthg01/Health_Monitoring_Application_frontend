// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import HealthGuide from './HealthGuide';
import axios from 'axios';
// import Chatbot from './Chatbot';

function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // Verify the token here
      axios
        .post('http://127.0.0.1:8000/api/token/verify/', { token: storedToken })
        .then(response => {
          setToken(storedToken);
        })
        .catch(error => {
          console.error('Token failed:', error);
          setToken(null);
          localStorage.removeItem('accessToken');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
// loding animation 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        {/* <Chatbot> */} 
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            {/* <Route path="/logout" element={<logout />} /> */}
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route 
              path="/logout" 
              element={token ? <Logout token={token} setToken={setToken} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/health-info" 
              element={token ? <HealthGuide /> : <Navigate to="/login" />}
            />
            <Route 
              path="/" 
              element={token ? <Navigate to="/health-info" /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
