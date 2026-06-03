import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router"

function CodigoEmpresa() {
    const { id } = useParams()
    return (
        <Container className="page-shell">
            <div className="card-surface auth-card">
                <h1>Código da empresa</h1>
                <p className="small-muted">Use este código para cadastrar novos usuários.</p>
                <div className="codigo-box">{id || "—"}</div>
                <Link to="/login" className="btn btn-primary w-100">Voltar para login</Link>
            </div>
        </Container>
    )
}

export default CodigoEmpresa
