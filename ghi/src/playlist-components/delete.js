import { useAuthContext } from "../user-components/token";
import 'bootstrap/dist/css/bootstrap.css';

function DeleteButton({ playlist_id, fetchData }) {
  const { token } = useAuthContext();
  const handleDelete = async (event) => {
    event.preventDefault();

    const playlistUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/playlists/${playlist_id}`;

    const fetchConfig = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(playlistUrl, fetchConfig);
    if (response.ok) {
      fetchData();
    }
  }
  return (
  <button onClick={handleDelete}>Delete</button>
)
  }
export default DeleteButton;
