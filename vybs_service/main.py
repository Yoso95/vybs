from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, playlists, tracks, track_playlist
import os
from authenticator import authenticator

app = FastAPI()

origins = [os.environ.get("CORS_HOST", "http://localhost:3000")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(playlists.router)
app.include_router(tracks.router)
app.include_router(track_playlist.router)
