import { Form, Container, Button } from "react-bootstrap"
import Cabecalho from "../components/Cabecalho"
import { useEffect, useState, type ChangeEvent } from "react"
import api from "../services/api";
import { useNavigate } from "react-router";

function Userpage() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState({
        _id: "",
        nome: "",
        email: ""
    });
    const [senha, setSenha] = useState("");

    const changeUsuario = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setUsuario((anteriorUsuario) => ({
            ...anteriorUsuario,
            [name]: value
        }))
    }

    const handleUpdateDados = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.put(`/user/${usuario._id}`, { nome: usuario.nome, email: usuario.email })
            localStorage.setItem("usuario", JSON.stringify(response.data))
            alert("Dados atualizados.")
        } catch (erro) {
            console.error(erro)
        }
    }

    const handleUpdateSenha = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.put(`/user/${usuario._id}/senha`, { senha })
            alert("Senha atualizada.")
        } catch (erro) {
            console.error(erro)
        }
    }

    const handleDeleteConta = async (event: React.FormEvent) => {
        event.preventDefault()
        const confirmacao = window.confirm("Tem certeza que deseja deletar sua conta?");
        if (!confirmacao) return;
        try {
            const response = await api.delete(`/user/${usuario._id}`)
            localStorage.clear()
            navigate("/login")
        } catch (erro) {
            console.error(erro)
        }
    }

    useEffect(() => {
        const localUser = localStorage.getItem("usuario");
        try {
            if (localUser) {
                const jsonUser = JSON.parse(localUser);
                setUsuario(jsonUser.usuario);
            } else {
                setUsuario({ _id: "invalido", nome: "usuario", email: "email@exemplo.com" });
            }
        } catch (erro) {
            console.error(erro)
        }
    }, []);

    return (
        <>
            <Cabecalho></Cabecalho>
            <Container>
                <h1>Informações de usuário</h1>
                <Form className="mb-3" onSubmit={handleUpdateDados}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            name="nome"
                            type="text"
                            placeholder="Nome Sobrenome"
                            value={usuario.nome}
                            onChange={changeUsuario}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="email@exemplo.com"
                            value={usuario.email}
                            onChange={changeUsuario}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit">Salvar alterações</Button>
                </Form>
                <Form className="mb-3" onSubmit={handleUpdateSenha}>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control
                            name="senha"
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        ></Form.Control>
                        <Form.Text>Mínimo de 8 caracteres!</Form.Text>
                    </Form.Group>
                    <Button type="submit">Alterar senha</Button>
                </Form>
                <Button variant="danger" onClick={handleDeleteConta}>Deletar conta</Button>
            </Container>
        </>
    )
}

export default Userpage