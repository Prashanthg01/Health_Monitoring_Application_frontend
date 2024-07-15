import React from 'react';
import axios from 'axios';

const Logout = ({ token, setToken }) => {
    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            // change the ip as per local ip
            await axios.post('http://127.0.0.1:8000/api/logout/', { refresh: refreshToken });
            setToken(null);
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
