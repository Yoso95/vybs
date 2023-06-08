import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./update-playlist.css";
import { useToken } from "../user-components/token";

function UpdatePlaylistForm() {
  let { playlist_id } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mood: "",
  });



  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        return data.account

      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const playlistUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlists/${playlist_id}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(playlistUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        name: "",
        description: "",
        mood: "",
      });

      navigate(`/token/playlists/`);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="playlist-update-component">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4" style={{backgroundColor: '#f7b733'}}>
            <h1>Edit a Playlist</h1>
            <form onSubmit={handleSubmit} id="edit-playlist-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.name}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.description}
                  placeholder="Description"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleFormChange}
                  value={formData.mood}
                  placeholder="Select a mood"
                  required
                  name="mood"
                  id="mood"
                  className="form-select"
                >
                  <option value="">Select a mood</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="angry">Angry</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="energetic">Energetic</option>
                </select>
                <label htmlFor="mood">Mood</label>
              </div>
              <button className="btn btn-dark">
                Save Changes to Playlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePlaylistForm;
