import { useState, type ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap"
import api from "../services/api"
import { Link, useNavigate } from "react-router";

function Login(){
    const navigate = useNavigate()
    
    const [usuario, setUsuario] = useState({
        email: "",
        senha: ""
    })

    const changeUsuario = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setUsuario((anteriorUsuario) => ({
            ...anteriorUsuario,
            [name]: value
        }))
    }
    
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.post("/auth", usuario)
            localStorage.setItem("usuario", JSON.stringify(response.data))
            navigate("/homepage")
        }catch(erro){
            console.error(erro)
        }
    }

    return (
        <Container className="page-shell">
            <div className="card-surface auth-card">
                <h1>Builder</h1>
                <p className="small-muted">Acesse sua conta para criar sua assinatura.</p>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email" 
                            placeholder="email@exemplo.com"
                            value={usuario.email}
                            onChange={changeUsuario}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                            name="senha"
                            type="password" 
                            placeholder="••••••••"
                            value={usuario.senha}
                            onChange={changeUsuario}
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100">Login</Button>
                </Form>
                <div className="mt-3">
                    <Link to={"/cadastro"}>Cadastrar-se</Link>
                </div>
            </div>
        </Container>
    )
}
export default Login
