import os
import requests
import base64

# This function works
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID", "A2")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", "B3")


def get_token():
    client_id = SPOTIFY_CLIENT_ID
    client_secret = SPOTIFY_CLIENT_SECRET
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("ascii")
    auth_b64 = base64.b64encode(auth_bytes).decode("ascii")
    headers = {"Authorization": "Basic " + auth_b64}
    auth_data = {"grant_type": "client_credentials"}
    auth_url = "https://accounts.spotify.com/api/token"
    response = requests.post(auth_url, headers=headers, data=auth_data)
    if response.status_code == 200:
        token = response.json()["access_token"]
        return token
    else:
        return {"error": "Failed to get access token"}
