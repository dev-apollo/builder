import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router"

function Cabecalho() {

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <Navbar className="justify-content-between app-navbar">
            <Container>
                <Link to={"/homepage"} className="text-decoration-none">
                    <Navbar.Brand>
                        <h3 className="mb-0">Builder</h3>
                    </Navbar.Brand>
                </Link>
                <Nav>
                    <Link to={"/userpage"} className="mx-2 nav-link nav-icon">
                        <h3 className="mb-0">
                            <i className="bi bi-person-circle"></i>
                        </h3>
                    </Link>
                    <Link to={"/empresa"} className="mx-2 nav-link nav-icon">
                        <h3 className="mb-0">
                            <i className="bi bi-building-fill"></i>
                        </h3>
                    </Link>
                    <Link to={"/login"} className="nav-link nav-icon">
                        <h3 className="mb-0">
                            <i onClick={handleLogout} className="bi bi-box-arrow-in-right"></i>
                        </h3>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Cabecalho
