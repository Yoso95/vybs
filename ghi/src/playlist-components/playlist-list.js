import React, { useState, useEffect } from "react";
import { useToken } from "../user-components/token";
import { Link } from "react-router-dom";
import "./playlist-list.css";

function PlaylistListPage() {
  const [playlists, setPlaylists] = useState([]);
  const { token } = useToken();

  const handleDelete = async (playlist_id) => {
    const playlistUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlists/${playlist_id}`;

    const fetchConfig = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(playlistUrl, fetchConfig);
    if (response.ok) {
      fetchData();
    }
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token/playlists`;

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
      setPlaylists(data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const DeleteButton = ({ playlist_id }) => (
    <button onClick={() => handleDelete(playlist_id)}>Delete</button>
  );

  return (
    <>
      <div id="playlist_list_component">
        <div className="container">
          <h1>Current Playlists</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Mood</th>
                <th>ID</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Add a Song</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist, id) => {
                return (
                  <tr key={id}>
                    <td>
                      <Link
                        to={`/playlist/${playlist.id}`}
                        style={{ color: "black" }}
                      >
                        {playlist.name}
                      </Link>
                    </td>
                    <td>{playlist.description}</td>
                    <td>{playlist.mood}</td>
                    <td>{playlist.id}</td>
                    <td>
                      <Link
                        to={`/playlist/update/${playlist.id}`}
                        style={{ color: "black" }}
                      >
                        {" "}
                        Edit{" "}
                      </Link>
                    </td>
                    <td>
                      <DeleteButton playlist_id={playlist.id} />
                    </td>
                    <td>
                      {" "}
                      <Link
                        to={`/search/${playlist.id}`}
                        style={{ color: "black" }}
                      >
                        {" "}
                        Add a Song{" "}
                      </Link>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default PlaylistListPage
