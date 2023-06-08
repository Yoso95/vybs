import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../user-components/token";
import "./playlist-detail.css";
import "./simple-search.css";
import SimpleSearch from "./simple-search";

function PlaylistDetail() {
  const { playlist_id } = useParams();
  const { token } = useToken();
  const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);

  const handleDeleteTrack = async (track_id) => {
    const deleteUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlist/${playlist_id}/${track_id}`;
    const fetchConfig2 = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response2 = await fetch(deleteUrl, fetchConfig2);
      if (response2.ok) {
        const updatedTracks = tracks.filter((track) => track.id !== track_id);
        setTracks(updatedTracks);
      } else {
        throw new Error("Unable to delete track");
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlist/${playlist_id}`;
      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setPlaylist(data);
      }

      const trackUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlist/${playlist_id}/tracks`;
      const fetchConfig1 = {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response1 = await fetch(trackUrl, fetchConfig1);
      if (response1.ok) {
        const data1 = await response1.json();
        setTracks(data1);
      }
    }
    if (token) {
      fetchData();
    }
  }, [token, playlist, playlist_id]);


  return (
    <div>
        <div className="playlist-info">
          <h1 className="playlist-name">{playlist.name}</h1>
          <h2 className="playlist-description">{playlist.description}</h2>
          <p className="playlist-mood">{playlist.mood}</p>
        </div>
        <SimpleSearch></SimpleSearch>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Song Length</th>
              <th>Album</th>
              <th>Album Cover</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, id) => {
              return (
                <tr key={id}>
                  <td>{track.name} </td>
                  <td>{track.artist}</td>
                  <td>{Math.floor(track.song_length / 60000)} Minutes</td>
                  <td>{track.album}</td>
                  <td>
                    <img className="cover-art" alt="album art" src={track.album_cover}></img>
                </td>
                <td>
                  <button onClick={() => handleDeleteTrack(track.id)}>
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PlaylistDetail;
