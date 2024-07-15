import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            console.log(response.data);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h3 className="card-title text-center mb-4 fw-semibold">Register</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                        <label htmlFor="first_name">First Name</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUserTie} /></span>
                            <input 
                                type="text" 
                                name="first_name" 
                                className="form-control" 
                                placeholder="First Name" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="last_name">Last Name</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUserTie} /></span>
                            <input 
                                type="text" 
                                name="last_name" 
                                className="form-control" 
                                placeholder="Last Name" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            <input 
                                type="text" 
                                name="username" 
                                className="form-control" 
                                placeholder="Username" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control" 
                                placeholder="Email" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                placeholder="Password" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                    {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
