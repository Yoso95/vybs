from pydantic import BaseModel


class PlaylistIn(BaseModel):
    name: str
    description: str
    mood: str


class PlaylistOut(BaseModel):
    id: int
    name: str
    description: str
    mood: str
