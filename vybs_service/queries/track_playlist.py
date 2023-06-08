from models.track_playlist import Track_playlistIn, Track_playlistOut
from queries.pool import pool
from models.playlists import PlaylistOut


class Track_playlistQueries:
    def create(
        self,
        track_playlist: Track_playlistIn,
    ) -> Track_playlistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                        INSERT INTO track_playlist (
                            track_id,
                            playlist_id,
                            account_id
                        )
                        VALUES (%s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        track_playlist["track_id"],
                        track_playlist["playlist_id"],
                        track_playlist["account_id"],
                    ],
                )
                id = result.fetchone()[0]
                return Track_playlistOut(
                    id=id,
                    track_id=track_playlist["track_id"],
                    playlist_id=track_playlist["playlist_id"],
                    account_id=track_playlist["account_id"],
                )

    def get_tracks_from_playlist(self, playlist_id: int) -> PlaylistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT track.*
                    FROM track
                    INNER JOIN track_playlist ON
                        track_playlist.track_id = track.id
                    INNER JOIN playlist ON
                        track_playlist.playlist_id = playlist.id
                    WHERE playlist.id = %s
                    """,
                    [playlist_id],
                )
                rows = cur.fetchall()
                tracks = []
                for row in rows:
                    track = {}
                    for i, column in enumerate(cur.description):
                        track[column.name] = row[i]
                    tracks.append(track)
                return tracks

    def delete_track_playlist(
        self, playlist_id: int, track_id: int, account_id: int
    ) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM track_playlist
                    WHERE playlist_id = %s
                    AND track_id = %s
                    AND account_id = %s
                    """,
                    [playlist_id, track_id, account_id],
                )
