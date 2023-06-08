SIGN UP
#
            Endpoint Path: /accounts
            Endpoint Method: POST
            Request Shape: Form
            Form Fields:
                First Name: String
                Last Name: String
                Username: String
                Email Address: String
                Password: String
            Response: Account Information and a Token
            Response Shape: JSON
                {
                    "user": {
                        "first_name": string,
                        "last_name": string,
                        "username": string,
                        "email_address": string,
                        "password": string,
                        "avatar" : string
                    }
                }

LOGIN
#
            Endpoint Path: /token
            Endpoint Method: POST
            Request Shape: Form
                Form Fields:
                    Username: String
                    Password: String
                    Password Confirmation: String
            Response: Account Information and a Token
            Response Shape: JSON
                {
                    "user": {
                        "username" : String
                        "password" : string
                        "password_confirmation" : string
                    }
                }

LOGOUT
#
            Endpoint path: /token
            Endpoint method: DELETE
            Headers:
            Authorization: Bearer token
            Response: Always true
            Response shape (JSON):
                ```json
                true
                ```

SHOW USER DETAILS
#
            Endpoint path: /token
            Endpoint method: GET
            Headers:
                Authorization: bearer token
            Response:
                A page displaying user information
            Response Shape:
            ```json
            {
                "username" : string
                "member_since" : date
                "playlists_made" : int
                "avatar" : string*
                "my_playlsits" : url
            }
            ```

USER LIST PLAYLISTS
#
            Endpoint path: /token/playlists
            Endpoint method: GET
            Headers:
            Authorization: Bearer token
             Request Shape(JSON):
                {
                    "name": string,
                    "picture_url": url,
                    "id": int
                }
            Response: Always true
                A list of playlists created by the user is shown
            Response shape (JSON):
                ```json
                "message" : "user playlists"
                ```


LIST PLAYLISTS
#
            Endpoint path: /playlists
            Endpoint method: GET
            Headers:
            Authorization: Bearer token
             Request Shape(JSON):
                {
                    "track_id": string
                }
            Response: Always true
                A list of playlists is shown
            Response shape (JSON):
                ```json
                "message" : "playlists"
                ```

CREATE PLAYLIST
#
            Endpoint path: /playlists
            Endpoint method: POST
            Headers:
            Authorization: Bearer token
            Request Shape (JSON):
                {
                    "name" : string,
                }
            Response: Always true
                A playlist is created via form input
            Response shape (JSON):
                ```json
                {
                    "name" : string,
                    "id" : int,
                }
                ```

SHOW DETAIL
#
            Endpoint path: /playlists/{id}
            Endpoint method: GET
            Headers:
                Authorization: Bearer token
            Response:
            Response Shape:
            ```json
            {

            }```

DELETE PLAYLIST
#
            Endpoint path: /playlists/{id}
            Endpoint method: DELETE
            Headers:
                Authorization: Bearer token
            Response:
            Response Shape:
            ```json
            {
                true
            }```


ADD TRACK
#
        Endpoint Path: /playlists/{id}/songs
        Endpoint Method: POST
        Headers:
            Authorization: Bearer token
        Request Shape(JSON):
        {
            "track_id": string
        }
        Response:
            A song is added to a playlist via playlist ID
        Response Shape:
        ```json
        {

        }```

DELETE TRACK
#
        Endpoint Path: /playlists/{id}/tracks/{track_id}
        Endpoint Method: DELETE
        Headers:
            Authorization: Bearer token

        Response:
            A song is added to a playlist via playlist ID
        Response Shape:
        ```json
        {

        }```


TRACK DETAIL
#
        Endpoint Path: /tracks/{id}
        Endpoint Method: GET
        Headers:
            Authorization: Bearer token
        Request Shape(JSON):
        {
            "track_id": string
        }
        Response:
            A song detail page
        Response Shape:
        ```json
        {

        }```
