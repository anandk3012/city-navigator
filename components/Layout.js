// components/Layout.js
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>City Navigator</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/fares" passHref>
                <Nav.Link>Fares</Nav.Link>
              </Link>
              <Link href="/services" passHref>
                <Nav.Link>Services</Nav.Link>
              </Link>
              <Link href="/profile" passHref>
                <Nav.Link>Profile</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '80px' }}>{children}</Container>
    </>
  );
};

export default Layout;
