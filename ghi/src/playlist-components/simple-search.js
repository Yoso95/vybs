import React, { useState, useEffect } from "react";
import { useToken } from "../user-components/token";
import "./simple-search.css";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { useParams } from "react-router-dom";

function SimpleSearch() {
  const { playlist_id } = useParams();
  const { token } = useToken();
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [searchSong, setSearchSong] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/callback`;
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
        setSpotifyToken(data);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  async function handleSearch(event) {
    event.preventDefault();
    const trackUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/spotify/search?search_input=${searchSong}`;
    const fetchConfig1 = {
      method: "get",
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
        "Content-Type": "application/json",
      },
    };
    const response1 = await fetch(trackUrl, fetchConfig1);
    if (response1.ok) {
      const data1 = await response1.json();
      setResults(data1); // data1 has full track info from spotify
    }
  }

  const [like, setLike] = useState({ undefined: false });
  const handleLike = async (event) => {
    let track_id;
    if (like[event.currentTarget.value] === true) {
      setLike({
        ...like,
        [event.currentTarget.value]: false,
      });
    } else {
      setLike({
        ...like,
        [event.currentTarget.value]: true,
      });
    }
    const trackTableUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/tracks/${event.currentTarget.value}`;
    const trackData = results.filter((result) => {
      return result.id === event.currentTarget.value;
    })[0];

    const trackDict = {
      spotify_id: event.currentTarget.value,
      name: trackData.name,
      artist: trackData.artists[0].name,
      song_length: trackData.duration_ms,
      album: trackData.album.name,
      album_cover: trackData.album.images[2].url,
    };

    const fetchConfig2 = {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackDict),
    };

    const response2 = await fetch(trackTableUrl, fetchConfig2);
    if (response2.ok) {
      const data2 = await response2.json();
      track_id = data2.id;
    }
    const playlistTrackTableUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/track_playlist/${track_id}/${playlist_id}`;
    const fetchConfig3 = {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response3 = await fetch(playlistTrackTableUrl, fetchConfig3);
    if (response3.ok) {
      await response3.json();

    }
  };

  const handleLikeIcon = (id) => {
    if (like[id] === true) {
      return <MdPlaylistAddCheck />;
    } else {
      return <MdPlaylistAdd />;
    }
  };

  return (
    <div className="add-track-component-ss">
      <form className="add-form-ss" onSubmit={handleSearch}>
        <input
          className="search-input-ss"
          type="text"
          placeholder=""
          value={searchSong}
          onChange={(event) => setSearchSong(event.target.value)}
        />
        <button
          className="search-submit-ss"
          type="submit"
          onClick={handleSearch}
        >
          {" "}
          search
        </button>
      </form>

      <ul className="track-background-ss">
        {results.map((track) => (
          <p key={track.id} className="track-cards-ss">
            <span className="track-ss">
              {track.name} <br></br>
            </span>

            <span className="artist-ss">
              {" "}
              {track.artists.map((artist) => artist.name).join(", ")} <br></br>
            </span>

            <button
              onClick={handleLike}
              className="add-btn-ss"
              value={track.id}
            >
              <span className="add-track-text"> add track </span>

              {handleLikeIcon(track.id)}
            </button>
          </p>
        ))}
      </ul>
    </div>
  );
}
export default SimpleSearch;
