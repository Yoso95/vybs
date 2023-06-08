from pydantic import BaseModel


class Track_playlistIn(BaseModel):
    track_id: int
    playlist_id: int


class Track_playlistOut(BaseModel):
    id: int | None
    track_id: int | None
    playlist_id: int | None
