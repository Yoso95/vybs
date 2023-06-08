

3/15/2023
- Just sayin hi. Again. Hi. Beans. Soup. BEANSOUP. hhihihi.sup. hi!

3/10/2022
- Demoed our project for Candice today. Our program runs without any error messages in the console, and all unit tests work. :)

3/9/2022
- Final changes made today. We updated our main page to be pretty.

3/8/2022
- WowWoWowow -- today we spent the entire class linting and troubleshooting for CI/CD
- But we did it! Our project is passing every test (API, Lint, and Build)
- Looking forward to learning more about deployment tomorrow.

3/7/2022
- Good day of tying up loose ends.
- Today we created our ReadMe, and I edited the .md files to look nice on Gitlab.
- We also combed through and got rid of any dead code, unnecessary comments, and unused components
- I added a searchbar feature to the playlist detail page which allows users to easily add new tracks to their existing playlist.

3/6/2022
- Practice test today! And I had a doctor's appointment so I was only here from like 4pm on.
- Continued tweaking DIVs to make background line up on every page

3/3/2023

- Formatted CSS on Search Song page -- component disappears when user submits a search
- Formed and tested (it works) my unit test on Create Playlist

3/2/2023

- We did it! We can create a playlist!
- Next up, and last up? Is formatting. We'll need to go over our CSS and begin to align all of the styles.
- I think we could also add a way to remove duplicates from the playlist, and I'd like to change the "add to playlist" button to change to "added!" after a user clicks it. And if they click it again, it should remove the song from the playlist. Kai has a video about this from last mod.

3/1/2023

- Spent a lot of time formatting our components today so that they render nicely with CSS.
- Looked into whether we want to use useContext or Redux to solve our Add Track to Playlist problem
- Solved our form input issue so account ID is no longer a problem (see below for deets)

2/28/2023

- Today we achieved a big one: we got song data to load on our frontend! Now, a user can type into the search bar and will receive a list of song results from the Spotify API that matches the words they put in. YEESH THAT WAS A BIG ONE.
- We played around with CSS today :) We all worked on our own little component for a while, so I'm sure it's going to be merge-hell tomorrow.
- I worked on add-track.js for the better portion of the afternoon. I'm trying to get it so a user can 'like/add/favorite' a song, and it will be added to their playlist. (The track needs to go onto the right playlist table). No luck yet, but looking into onSubmit\*\*\*, event listeners, and redux global states.
- Tomorrow, I need to figure out the above, but also need to edit the endpoint (maybe?) of 'add a track' on 'playlistlists'. Right now, it does not carry the user ID with it -- which we'll need.
- Check out what's happening with playlist ID -- need to figure out a way to make it so that account ID is fixed on the form and not able to be changed!

2/27/2023

- Created and completed the Update Playlist frontend today -- need to figure out a way to get Account ID into the form more gracefully, but for now, it functions.
- Added the tiniest bit of styling to our navbar and background
- Ran into quite a few Git problems (ghost commits and merge madness)
- Needing to figure out our 'track_playlist' situation, and what needs to be done about SpotifyAPI... but we're very close to finishing our frontend, outside of the API.

2/24/2023

- All that thinking did us good! We pulled through our biggest issues, and came out the other side.
- All endpoints work... for now
- Frontend Auth is getting set up! We have our Signing Key. We have JWTdown but need to check it.

2/23/2023

- Today was a day spent in reflection. Do we need to switch to MongoDB? What are our models?
- With a day spent in thought, we did not produce anything for our project. Just vibes. Vybs.

2/22/2023

- I drove today! BEEP BEEP BEEP BEEP!
- We thought we were ready to dive into our Spotify endpoints, but we weren't. We needed to fix our Accounts endpoints.
- Our 'get token' endpoint wasn't working, so we reformatted our AccountOut model to work around some hashed password issues.
- We realized we need to add another table, and will be working on that tomorrow. The idea is to use tracks and playlists in a third table as foreign keys, which compiles into a 'users specific playlist' table.
-

2/21/2023

- Yonah drove all day today! Beep beep! 8 whole hours! Go Yonah!
- It took us forever to figure out how to get Spotify's API to work (something something tokens? something authenticators? swapping?!) BUT WE DID IT.
- Wrote our first successful call to the Spotify API! We can retrieve a track via it's ID, and have narrowed down the response to return the artists name, the album, and the album art.

2/16/2023

- Shakeeb and Ben drove today! Beep beep!
- We continued to set up our endpoints. We can now delete a playlist, get a playlist, update a playlist, and we can list all playlists.

2/15/2023

- I drove today! Beep beep!
- We successfuly got our login/logout/createuser paths to work!
- Added our authenticator and added signing key to the env file
- Added router, queries, and pool files

2/14/2023

- Happy Valentine's Day!
- Got our Dockerfile in order, and managed to create and run all containers (GHI, API, pgAdmin, db)
- Started to tackle Authentication key (signing key)

2/13/2023

- Monday was a day off for me.

2/10/2023

- Friday was a day off for me.

2/9/2023

- Finished Wireframing our project using Excalidraw
- Created and conceptually connected API endpoints for our app
- Wrote our ReadMe.Md
