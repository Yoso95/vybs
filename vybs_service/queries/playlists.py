from models.playlists import PlaylistIn, PlaylistOut
from queries.pool import pool


class PlaylistQueries:
    def create(
        self,
        playlist: PlaylistIn,
        account_id: int,
    ) -> PlaylistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                        INSERT INTO playlist (name, description,
                        mood, account_id)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        playlist.name,
                        playlist.description,
                        playlist.mood,
                        account_id,
                    ],
                )
                id = result.fetchone()[0]
                return PlaylistOut(
                    id=id,
                    name=playlist.name,
                    description=playlist.description,
                    mood=playlist.mood,
                    account_id=account_id,
                )

    def get_all_playlists(self, account_id: int) -> PlaylistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                         , name
                         , description
                         , mood
                    FROM playlist
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                results = []
                for row in cur.fetchall():
                    playlist = {}
                    for i, column in enumerate(cur.description):
                        playlist[column.name] = row[i]
                    results.append(playlist)
                return results

    def update_playlist(
        self,
        id: int,
        playlist: PlaylistIn,
        account_id: int,
    ) -> PlaylistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    playlist.name,
                    playlist.description,
                    playlist.mood,
                    account_id,
                    id,
                ]
                cur.execute(
                    """
                    UPDATE playlist
                    SET name = %s
                        , description = %s
                        , mood = %s
                        , account_id = %s
                    WHERE id = %s
                    RETURNING id, name, description, mood,
                    account_id
                    """,
                    params,
                )
                results = None
                row = cur.fetchone()
                if row is not None:
                    results = {}
                    for i, column in enumerate(cur.description):
                        results[column.name] = row[i]
                return results

    def delete_playlist(self, id: int, account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM playlist
                    WHERE id = %s
                    AND account_id = %s
                    """,
                    [id, account_id],
                )

    def get_playlist(self, id: int, account_id: int) -> PlaylistOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                        , name
                        , description
                        , mood
                    FROM playlist
                    WHERE id = %s
                    AND account_id = %s
                    """,
                    [id, account_id],
                )
                result = None
                row = cur.fetchone()
                if row is not None:
                    result = {}
                    for i, column in enumerate(cur.description):
                        result[column.name] = row[i]

                return result
