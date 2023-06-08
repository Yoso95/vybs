steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            avatar VARCHAR(1000)
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE track (
            id SERIAL PRIMARY KEY NOT NULL,
            spotify_id VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            song_length INT NOT NULL,
            album VARCHAR(100) NOT NULL,
            album_cover VARCHAR(1000)
        );
        """,
        """
        DROP TABLE track;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE playlist (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            mood VARCHAR(100) NOT NULL,
            account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE playlist;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE track_playlist (
            id SERIAL PRIMARY KEY NOT NULL,
            track_id INTEGER REFERENCES track("id") ON DELETE CASCADE,
            playlist_id INTEGER REFERENCES playlist("id") ON DELETE CASCADE,
            account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE track_playlist;
        """,
    ],
]
