from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.playlists import PlaylistIn, PlaylistOut
from queries.playlists import PlaylistQueries
from authenticator import authenticator

router = APIRouter()


@router.get("/token/playlists", tags=["Playlists"])
def get_all_playlists(
    repo: PlaylistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_playlists(account_id=account_data["id"])


@router.post("/playlists", response_model=PlaylistOut, tags=["Playlists"])
def create_playlist(
    playlist: PlaylistIn,
    repo: PlaylistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(playlist=playlist, account_id=account_data["id"])


@router.put("/playlists/{id}", tags=["Playlists"])
def update_playlist(
    id: int,
    playlist: PlaylistIn,
    repo: PlaylistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.update_playlist(id, playlist, account_id=account_data["id"])
    return result


@router.delete(
    "/playlists/{playlist_id}", response_model=bool | str, tags=["Playlists"]
)
def delete_playlist(
    playlist_id: int,
    repo: PlaylistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_playlist(playlist_id, account_id=account_data["id"])
    return True


@router.get(
    "/playlist/{playlist_id}", response_model=PlaylistOut, tags=["Playlists"]
)
def get_playlist(
    playlist_id: int,
    response: Response,
    repo: PlaylistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.get_playlist(playlist_id, account_id=account_data["id"])
    if result is None:
        response.status_code = 404
    else:
        return result
