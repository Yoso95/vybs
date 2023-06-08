import json
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.playlists import PlaylistIn, PlaylistOut, PlaylistQueries

client = TestClient(app=app)


def mock_get_current_account_data():
    return {
        "id": "10",
    }


class MockPlaylistQuery:
    def create(self, playlist: PlaylistIn, account_id: int) -> PlaylistOut:
        playlist_dict = playlist.dict()
        return PlaylistOut(id=2, **playlist_dict)

    def get_all_playlists(self, account_id):
        return [
            {
                "name": "Feathers",
                "description": "Soft Songs for Soft People",
                "mood": "energetic",
                "account_id": 10,
            },
            {
                "name": "Weathers",
                "description": "Weather Songs for weather People",
                "mood": "energetic",
                "account_id": 10,
            },
        ]

    def get_playlist(self, playlist_id, account_id):
        return {
            "id": 1,
            "name": "string",
            "description": "string",
            "mood": "string",
        }

    def delete_playlist(
        self, playlist: PlaylistIn, account_id: int
    ) -> PlaylistOut:
        return True


def test_mock_create_playlist():
    # Arrange
    app.dependency_overrides[PlaylistQueries] = MockPlaylistQuery
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    expected = {
        "name": "Feathers",
        "description": "Soft Songs for Soft People",
        "mood": "energetic",
        "account_id": 10,
    }

    # Act
    response = client.post("/playlists", json.dumps(expected))

    # Assert (needs boolean)
    assert response.status_code == 200
    assert response.json()["id"] == 2
    assert response.json()["name"] == "Feathers"
    assert response.json()["description"] == "Soft Songs for Soft People"

    app.dependency_overrides = {}


def test_mock_get_all_playlists():
    app.dependency_overrides[PlaylistQueries] = MockPlaylistQuery
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data

    response = client.get("/token/playlists")

    assert response.status_code == 200
    assert response.json()[0]["name"] == "Feathers"
    assert response.json()[1]["name"] == "Weathers"

    app.dependency_overrides = {}


def test_mock_get_playlist():
    expected = {
        "id": 1,
        "name": "string",
        "description": "string",
        "mood": "string",
    }
    # Arrange
    account = {"id": 111}
    app.dependency_overrides[PlaylistQueries] = MockPlaylistQuery
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: account

    # #Act
    response = client.get("/playlist/70")

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_mock_delete_playlist():
    account = {"id": 123}
    app.dependency_overrides[PlaylistQueries] = MockPlaylistQuery
    response = client.get("/token/playlists/")
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: account

    response = client.delete("/playlists/99")

    assert response.status_code == 200
    assert response.json() == True  # noqa

    app.dependency_overrides = {}
