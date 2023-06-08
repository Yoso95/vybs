import React, { useState } from 'react';
import { useToken } from '../user-components/token';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './createplaylist.css';

function PlaylistForm() {
    const navigate = useNavigate()
    const { token } = useToken()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        mood: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlists`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
                description: '',
                mood: '',
            });
            navigate('/token/playlists')
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }
    
    return (
    <main className="gradient">
        <div className="row">
            <div className="offset-3 col-6 move-down" style={{ backgroundColor: 'black', border: '2px solid purple', boxShadow: '0 0 20px purple' }}>
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center" style={{ color: 'purple', textShadow: '0 0 5px purple, 0 0 15px purple, 0 0 20px purple, 0 0 5px purple, 0 0 30px purple, 0 0 100px purple, 0 0 100px purple',  marginTop: '-20px'}}>Create a Playlist</h1>
                    <form onSubmit={handleSubmit} id="create-playlist-form" className="text-center">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" style={{ backgroundColor: '#b19cd9', borderColor: 'purple' }}/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.description} placeholder="Description" required type="text" name="description" id="description" className="form-control" style={{ backgroundColor: '#b19cd9', borderColor: 'purple' }}/>
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleFormChange} value={formData.mood} placeholder="Select a mood" required name="mood" id="mood" className="form-select" style={{ backgroundColor: '#b19cd9', borderColor: 'purple' }}>
                                <option value="">Select a mood</option>
                                <option value="happy">Happy</option>
                                <option value="sad">Sad</option>
                                <option value="angry">Angry</option>
                                <option value="relaxed">Relaxed</option>
                                <option value="energetic">Energetic</option>
                            </select>
                            <label htmlFor="mood">Mood</label>
                        </div>
                        <button className="btn create-btn" style={{ backgroundColor: 'purple', color: 'white'}}>Create Playlist</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    );
}

export default PlaylistForm;
