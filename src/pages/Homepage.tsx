import { useEffect, useState } from "react"
import Cabecalho from "../components/Cabecalho";
import { Link } from "react-router";
import { Button, Container } from "react-bootstrap";
import api from "../services/api";

interface IAssinaturaResumo {
    _id: string;
    nome?: string | null;
}

function Homepage() {
    const [user, setUser] = useState({ _id: "", nome: "", email: "" });
    const [assinaturas, setAssinaturas] = useState<IAssinaturaResumo[]>([]);
    
    const handleDeletarAssinatura = async (idAssinatura: string) => {
        try {
            await api.delete(`/assinatura/${idAssinatura}/${user._id}`);
            setAssinaturas(assinaturas.filter(assinatura => assinatura._id !== idAssinatura));
        } catch (erro) {
            console.error(erro);
        }
    };

    useEffect(() => {
        const sincronizarDados = async () => {
            const localUser = localStorage.getItem("usuario");
            try {
                if (localUser) {
                    const jsonUser = JSON.parse(localUser);
                    setUser(jsonUser.usuario);
                    const response = await api.get(`/assinatura/usuario/${jsonUser.usuario._id}`)
                    setAssinaturas(response.data);
                } else {
                    setUser({ _id: "invalido", nome: "usuario", email: "email@exemplo.com" });
                }
            } catch (erro) {
                console.error(erro)
            }
        }
        sincronizarDados()
    }, []);

    return (
        <>
            <Cabecalho></Cabecalho>
            <Container className="page-shell">
                <div className="card-surface hero-card">
                    <h1>Seja bem-vindo(a), {user.nome}!</h1>
                    <p className="small-muted">
                        Crie assinaturas profissionais em minutos e mantenha a identidade visual da sua empresa.
                    </p>
                    <div className="hero-actions">
                        <Link to={"/"} className="btn btn-primary">Criar assinatura</Link>
                        <Link to={"/userpage"} className="btn btn-outline-secondary">Meu perfil</Link>
                    </div>
                    {assinaturas.length > 0 && (
                        <div className="assinaturas-lista">
                            {assinaturas.map((assinatura) => (
                                <div key={assinatura._id} className="assinatura-card">
                                    <div>
                                        <h3>{assinatura.nome || "Sem nome"}</h3>
                                        <p className="small-muted mb-0">Clique para abrir e editar.</p>
                                    </div>
                                    <div className="assinatura-card-actions">
                                        <Link
                                            to={`/assinatura/${assinatura._id}`}
                                            className="btn btn-primary">
                                            Abrir
                                        </Link>
                                        <Button 
                                            variant="outline-danger"
                                            onClick={() => handleDeletarAssinatura(assinatura._id)}
                                        >
                                            Deletar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

export default Homepage
