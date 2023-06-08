from fastapi import (
    Depends,
    APIRouter,
)
from models.track_playlist import Track_playlistOut
from queries.track_playlist import Track_playlistQueries
from authenticator import authenticator

router = APIRouter()


@router.post(
    "/track_playlist/{track_id}/{playlist_id}/",
    response_model=Track_playlistOut,
    tags=["Track Playlist"],
)
def create_track_playlist(
    track_id: int,
    playlist_id: int,
    repo: Track_playlistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(
        {
            "track_id": track_id,
            "playlist_id": playlist_id,
            "account_id": account_data["id"],
        }
    )


@router.get("/playlist/{playlist_id}/tracks", tags=["Track Playlist"])
def get_playlist_tracks(
    playlist_id: int,
    repo: Track_playlistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_tracks_from_playlist(playlist_id)


@router.delete("/playlist/{playlist_id}/{track_id}", tags=["Track Playlist"])
def delete_playlist_tracks(
    playlist_id: int,
    track_id: int,
    repo: Track_playlistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete_track_playlist(
        playlist_id, track_id, account_id=account_data["id"]
    )
