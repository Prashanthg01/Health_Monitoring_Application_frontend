import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);
    const currentUsername = localStorage.getItem('username');
    // console.log(currentUsername);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            // change the ip as per local ip
            const response = await axios.post('http://127.0.0.1:8000/api/health_info/', {
                query,
                username: currentUsername
            });
            const botHealthPlans = Array.isArray(response.data.health_plans)
                ? response.data.health_plans
                : response.data.health_plans.split('.').map(sentence => sentence.trim()).filter(sentence => sentence);

            const botDiseaseSymptoms = Array.isArray(response.data.disease_symptoms)
                ? response.data.disease_symptoms
                : response.data.disease_symptoms.split('.').map(sentence => sentence.trim()).filter(sentence => sentence);

            setResponses([...responses, { user: query, healthPlans: botHealthPlans, diseaseSymptoms: botDiseaseSymptoms }]);
            setQuery('');
        } catch (error) {
            console.error("Error in featch:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Health Guide</h1>
            <p className="text-center mb-4">Health monitoring and advice application using AI technologies</p>
            <div className="chat-window border rounded p-4 shadow">
                <div className="chat-messages mb-3">
                    {responses.map((resp, index) => (
                        <div key={index} className="mb-3">
                    <p className='mb-4 ps-2'><strong className='profile_bg d_blue'>You:</strong> {resp.user}</p>
                            <div className="bg-light p-2 rounded">
                                <div className='d-flex'>
                                    <p><strong className='profile_bg d_red'>Bot:</strong></p>
                            <div>
                                <ul>
                                    {resp.healthPlans.map((sentence, idx) => (
                                        <li key={idx}>{sentence}</li>
                                    ))}
                                </ul>
                                {resp.diseaseSymptoms.length > 0 && (
                                    <>
                                        <p><strong>Disease Symptoms:</strong></p>
                                        <ul>
                                            {resp.diseaseSymptoms.map((symptom, idx) => (
                                                <li key={idx}>{symptom}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me about your health..."
                />
                <button type="submit" className="btn btn-primary">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
            </div>
        </div>
    );
};

export default Chatbot;
