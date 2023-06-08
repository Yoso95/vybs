# VYBS

- Shakeeb Jafri
- Ben Thompson
- Yonah Austin
- Bernadette Di Blasio

## DESIGN

[API Design](docs/apidesign.md)

[Data Model](docs/data-models.md)

[GHI](docs/ghi.md)

[Integrations](docs/integrations.md)

## INTENDED MARKET

Our target market is anyone who enjoys music. Music connosieurs.

## FUNCTIONALITY

Visitors to our site can search for songs and create playlists.
Users must register for an account to have access to the playlists functions.
After registering, users can see their details on the User Detail Page.
Once logged in, the user can interact with their playlists by editing exisiting playlists or creating new ones.
Users add tracks to playlists by searching for them by the songs name, artist, or album.
From the playlist page, users can click individual playlists to see the details of the tracks that are associated with that playlist


## PROJECT INITIALIZATION

To fully enjoy this application on your local machine, please make sure to follow these steps:

Clone the repository down to your local machine
CD into the new project directory
Run docker volume create pg-admin
Run docker volume create postgres-data
Run docker compose build
Run docker compose up

Exit the container's CLI, and enjoy Vybs to its fullest!

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>
- Flake8: <https://marketplace.visualstudio.com/items?itemName=ms-python.flake8>
