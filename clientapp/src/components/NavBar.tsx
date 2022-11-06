import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { StyledNav } from "./NavBar.styled";
function NavBar() {
  const { pathname } = useLocation();
  return (
    <StyledNav>
      <Nav variant="tabs" activeKey={pathname} as="ul">
        <Nav.Item as="li">
          <Nav.Link data-rr-ui-event-key="/" as={Link} to="/">
            Check Locations
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link data-rr-ui-event-key="/upload" as={Link} to="/upload">
            Upload
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </StyledNav>
  );
}

export default NavBar;
