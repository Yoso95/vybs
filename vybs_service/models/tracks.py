from pydantic import BaseModel


class TrackIn(BaseModel):
    spotify_id: str
    name: str
    artist: str
    song_length: int
    album: str
    album_cover: str


class TrackOut(BaseModel):
    id: int | None
    spotify_id: str
    name: str | None
    artist: str | None
    song_length: int | None
    album: str | None
    album_cover: str | None
