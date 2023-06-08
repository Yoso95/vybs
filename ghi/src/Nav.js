import "./Nav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useToken} from "./user-components/token";
import { NavLink } from "react-router-dom";


function DropdownNav() {
    const { token } = useToken()

    return (
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>
            <NavLink
              to="/"
              className="home-page-font"
              style={{ fontSize: "24px" }}
            >
              VYBS
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <NavDropdown title="WELCOME" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/logout">
                    <span>Logout</span>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/account">
                    <span>User Detail</span>{" "}
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="USER" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/login">
                    <span>Login</span> 
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/signup">
                    <span>Sign Up</span>
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {token ? (
              <NavDropdown title="PLAYLISTS" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/token/playlists">
                    <span>See All</span>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/playlist/new">
                    <span>Create</span>
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="PLAYLISTS" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/login">
                    <span>Please sign in to view</span>
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
}

export default DropdownNav;
