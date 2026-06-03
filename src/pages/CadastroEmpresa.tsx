import { useState, type ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap"
import api from "../services/api"
import { useNavigate } from "react-router";
import { useMask } from "@react-input/mask"

function CadastroEmpresa(){
    const navigate = useNavigate()
    const cnpjRef = useMask({ mask: "__.___.___/____-__", replacement: { _: /\d/ } });
    const telefoneRef = useMask({ mask: "(__) _____-____", replacement: { _: /\d/ } });
    
    const [empresa, setEmpresa] = useState({
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: ""
    })

    const changeEmpresa = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setEmpresa((anteriorEmpresa) => ({
            ...anteriorEmpresa,
            [name]: value
        }))
    }
    
    const handleCadastro = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.post("/empresa", empresa)
            localStorage.setItem("empresa", JSON.stringify(response.data))
            navigate(`/codigo-empresa/${response.data._id}`)
        }catch(erro){
            console.error(erro)
        }
    }

    return (
        <Container className="page-shell">
            <div className="card-surface auth-card">
                <h1>Cadastro de empresa</h1>
                <p className="small-muted">Cadastre sua empresa para organizar as assinaturas.</p>
                <Form onSubmit={handleCadastro}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome fantasia</Form.Label>
                    <Form.Control 
                        name="nome"
                        type="text" 
                        placeholder="Empresa Exemplos"
                        value={empresa.nome}
                        onChange={changeEmpresa}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control 
                        ref={cnpjRef}
                        name="cnpj"
                        type="text" 
                        placeholder="00.111.222/3333-44"
                        value={empresa.cnpj}
                        onChange={changeEmpresa}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name="email"
                        type="email" 
                        placeholder="email@exemplo.com"
                        value={empresa.email}
                        onChange={changeEmpresa}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        ref={telefoneRef}
                        name="telefone"
                        type="tel" 
                        placeholder="00 91234-5678"
                        value={empresa.telefone}
                        onChange={changeEmpresa}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control 
                        name="endereco"
                        type="text" 
                        placeholder="Rua Exemplo 123 - Bairro, Cidade - EX"
                        value={empresa.endereco}
                        onChange={changeEmpresa}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="w-100">Cadastrar</Button>
            </Form>
            </div>
        </Container>
    )
}
export default CadastroEmpresa
