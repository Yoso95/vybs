    PLAYLIST
| Name          | Type       | Unique | Optional |
|---------------|------------|--------|----------|
| id            | SERIAL(PK) | Yes    | No       |
| playlist_name | VARCHAR    | No     | No       |
| description   | TEXT       | No     | Yes      |
| mood          | VARCHAR    | No     | No       |

    ACCOUNTS
| Name            | Type       | Unique | Optional |
|-----------------|------------|--------|----------|
| id              | SERIAL(PK) | Yes    | No       |
| username        | VARCHAR    | Yes    | No       |
| hashed_password | VARCHAR    | Yes    | No       |
| full_name       | VARCHAR    | No     | No       |

    TRACK-PLAYLIST
| Name        | Type       | Unique | Optional |
|-------------|------------|--------|----------|
| id          | SERIAL(PK) | Yes    | No       |
| track_id    | INT        | Yes    | No       |
| playlist_id | INT        | Yes    | No       |

    TRACKS
| Name        | Type       | Unique | Optional |
|-------------|------------|--------|----------|
| id          | SERIAL(PK) | Yes    | No       |
| spotify_id  | STR        | Yes    | No       |
| name        | STR        | Yes    | No       |
| artist      | STR        | Yes    | No       |
| song_length | INT        | Yes    | No       |
| album       | STR        | Yes    | No       |
| album_cover | STR        | Yes    | No       |
