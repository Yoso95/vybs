import { AuthProvider} from "./user-components/token.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DropdownNav from "./Nav.js";
import MainPage from "./MainPage";
import Login from "./user-components/login";
import Logout from "./user-components/logout";
import Signup from "./user-components/signup";
import PlaylistListPage from "./playlist-components/playlist-list.js";
import PlaylistDetail from "./playlist-components/playlist-detail.js";
import UserDetail from "./user-components/user-detail.js";
import PlaylistForm from "./playlist-components/CreatePlaylistForm.js";
import AddTrackPage from "./playlist-components/add-track.js";
import UpdatePlaylistForm from "./playlist-components/update.js";


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <DropdownNav />
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="/login">
            <Route index element={<Login />} />
            <Route path="new" element={<Login />} />
          </Route>

          <Route path="/logout">
            <Route index element={<Logout />} />
            <Route path="new" element={<Logout />} />
          </Route>

          <Route path="/signup">
            <Route index element={<Signup />} />
            <Route path="new" element={<Signup />} />
          </Route>

          <Route path="/token/playlists">
            <Route index element={<PlaylistListPage />} />
            <Route path="new" element={<PlaylistListPage />} />
          </Route>

          <Route path="/playlist/:playlist_id">
            <Route index element={<PlaylistDetail />} />
            <Route path="new" element={<PlaylistDetail />} />
          </Route>

          <Route path="/playlist">
            <Route index element={<PlaylistForm />} />
            <Route path="new" element={<PlaylistForm />} />
          </Route>

          <Route path="/search">
            <Route index element={<AddTrackPage />} />
          </Route>

          <Route path="/account">
            <Route index element={<UserDetail />} />
            <Route path="new" element={<UserDetail />} />
          </Route>

          <Route />
          <Route path="/playlist/{playlist_id}">
            <Route index element={<PlaylistDetail />} />
            <Route path="new" element={<PlaylistDetail />} />
          </Route>

          <Route path="/playlist/update/:playlist_id">
            <Route index element={<UpdatePlaylistForm />} />
            <Route path="new" element={<UpdatePlaylistForm />} />
          </Route>

          <Route path="/search/:playlist_id">
            <Route index element={<AddTrackPage />} />
            <Route path="new" element={<AddTrackPage />} />
          </Route>
        </Routes>
        {/* <GetToken /> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
