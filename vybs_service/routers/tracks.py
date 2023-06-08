from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.tracks import TrackOut
from authenticator import authenticator
import base64
import requests
import os
from queries.tracks import TrackQueries

router = APIRouter()


@router.get("/spotify/search", tags=["Songs"])
def get_track(
    search_input: str,
    response: Response,
    repo: TrackQueries = Depends(),
):
    result = repo.search_track_from_spotify(search_input)
    if result is None:
        response.status_code = 404
    else:
        return result


@router.get("/tracks/{id}", tags=["Songs"])
def get_track_from_table(
    id: int,
    repo: TrackQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return (repo.get_track(id),)


@router.post("/tracks/{spotify_id}", tags=["Songs"])
def add_track_to_table(
    track: TrackOut,
    repo: TrackQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.add_track(track=track)


SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID", "A2")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", "B3")


@router.get("/callback")
async def spotify():
    client_id = SPOTIFY_CLIENT_ID
    client_secret = SPOTIFY_CLIENT_SECRET
    client_id = SPOTIFY_CLIENT_ID
    client_secret = SPOTIFY_CLIENT_SECRET
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("ascii")
    auth_b64 = base64.b64encode(auth_bytes).decode("ascii")
    auth_headers = {"Authorization": "Basic " + auth_b64}
    auth_data = {"grant_type": "client_credentials"}
    auth_url = "https://accounts.spotify.com/api/token"
    response = requests.post(auth_url, headers=auth_headers, data=auth_data)
    if response.status_code == 200:
        token = response.json()["access_token"]
        return {"token": token}
    else:
        return {"error": "Failed to get access token"}
