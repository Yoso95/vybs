import json
from models.tracks import TrackIn, TrackOut
from queries.pool import pool
import requests
from auth_token import get_token
import os


SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID", "A2")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", "B3")
SPOTIFY_REDIRECT_URI = "https://localhost:8000/callback/"


class TrackQueries:
    def search_track_from_spotify(self, search_input=str):
        access_token = get_token()
        result = requests.get(
            f"https://api.spotify.com/v1/search?q={search_input}&type=track&limit=10",  # noqa
            headers={"Authorization": f"Bearer {access_token}"},
        )

        content = json.loads(result.content)
        return content["tracks"]["items"]

    def get_track(self, id: int) -> TrackOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                    SELECT *
                    FROM track
                    WHERE id = %s;
                    """,
                        [id],
                    )
                    result = None
                    record = cur.fetchone()
                    if record is not None:
                        result = {}
                        for i, column in enumerate(cur.description):
                            result[column.name] = record[i]
                    return result
        except Exception as e:  # noqa
            return {"message": "Could not get that song"}

    def add_track(
        self,
        track: TrackIn,
    ) -> TrackOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO track (spotify_id, name, artist,
                    song_length, album, album_cover)
                    VALUES (%s,%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        track.spotify_id,
                        track.name,
                        track.artist,
                        track.song_length,
                        track.album,
                        track.album_cover,
                    ],
                )
                id = result.fetchone()[0]
                return TrackOut(
                    id=id,
                    spotify_id=track.spotify_id,
                    name=track.name,
                    artist=track.artist,
                    song_length=track.song_length,
                    album=track.album,
                    album_cover=track.album_cover,
                )
