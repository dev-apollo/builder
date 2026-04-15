import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router"

function Cabecalho(){
    return(
        <Navbar className="justify-content-between">
            <Container>
                <Link to={"/homepage"}>
                    <Navbar.Brand>
                        <h3>Builder</h3>
                    </Navbar.Brand>
                </Link>
                <Link to={"/userpage"}>
                    <h3>
                        <i className="bi bi-person-circle"></i>
                    </h3>   
                </Link>
            </Container>
        </Navbar>
    )
}

export default Cabecalho