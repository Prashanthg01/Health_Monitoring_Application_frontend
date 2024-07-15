import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // change the ip as per local ip
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      const accessToken = response.data.access;
      setToken(accessToken);
      // store data in local storege and get when required
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('username', formData.username);
      setErrorMessage('');
      navigate('/health-info');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
              <div className="card login_card">
        <div className="card-body shadow">
              <h3 className="card-title text-center fw-semibold">Login</h3>
              <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                  <div className="input-group-prepend input-group-text">
                      <span><FontAwesomeIcon icon={faUser} /></span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                <div className="input-group-prepend input-group-text">
                      <span><FontAwesomeIcon icon={faLock} /></span>
                  </div>
                  <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mx-auto d-block d_blue">Login</button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
