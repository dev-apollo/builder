import { useState, type ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap"
import api from "../services/api"
import { useNavigate } from "react-router";

function Cadastro(){
    const navigate = useNavigate()
    
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: ""
    })
    
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const changeUsuario = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setUsuario((anteriorUsuario) => ({
            ...anteriorUsuario,
            [name]: value
        }))
    }
    
    const handleCadastro = async (event: React.FormEvent) => {
        event.preventDefault()
        if(usuario.senha !== confirmarSenha){
            alert("As senhas não coincidem.")
            return
        }
        if(usuario.senha.length < 8){
            alert("As senha exige no mínimo 8 caracteres.")
            return
        }
        try {
            const response = await api.post("/user", usuario)
            localStorage.setItem("usuario", JSON.stringify(response.data))
            navigate("/homepage")
        }catch(erro){
            console.error(erro)
        }
    }

    return (
        <Container className="pt-3">
            <h1>Cadastro</h1>
            <Form onSubmit={handleCadastro}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        name="nome"
                        type="text" 
                        placeholder="Nome Sobrenome"
                        value={usuario.nome}
                        onChange={changeUsuario}
                    />
                </Form.Group>
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
                    <Form.Text>Mínimo de 8 caracteres!</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirmar senha</Form.Label>
                    <Form.Control 
                        name="confirmarSenha"
                        type="password" 
                        placeholder="••••••••"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Cadastrar-se</Button>
            </Form>
        </Container>
    )
}
export default Cadastro