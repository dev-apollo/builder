import { useEffect, useState, type ChangeEvent } from "react"
import Cabecalho from "../components/Cabecalho";
import { Button, Table, Form, Container } from "react-bootstrap";
import api from "../services/api";
import { useMask } from "@react-input/mask";

function Empresa() {
    const [empresa, setEmpresa] = useState({
        _id: "",
        nome: "",
        cnpj: ""
    });
    const cnpjRef = useMask({ mask: "__.___.___/____-__", replacement: { _: /\d/ } })
    const [idUsuario, setIdUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([{ _id: "", nome: "", email: "", isAdmin: false }]);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const sincronizarDados = async () => {
            const localUser = localStorage.getItem("usuario");
            try {
                if (localUser) {
                    const jsonUser = JSON.parse(localUser);
                    setIdUsuario(jsonUser.usuario._id)
                    const response = await api.get(`/empresa/${jsonUser.usuario._idEmpresa}`)
                    setEmpresa(response.data)
                    const responseUsuarios = await api.get(`/empresa/${jsonUser.usuario._idEmpresa}/usuarios`)
                    setUsuarios(responseUsuarios.data)
                    for (const usuario of responseUsuarios.data) {
                        if (usuario._id === jsonUser.usuario._id) {
                            setIsAdmin(usuario.isAdmin)
                            break;
                        }
                    }
                }
            } catch (erro) {
                console.error(erro)
            }
        }
        sincronizarDados()
    }, []);

    const changeEmpresa = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setEmpresa((anteriorEmpresa) => ({
            ...anteriorEmpresa,
            [name]: value
        }))
    }

    const handleToggleAdmin = async (idUsuarioAlvo: string) => {
        try {
            await api.put(`/user/${idUsuarioAlvo}/admin`)
            setUsuarios((usuariosAnteriores) => usuariosAnteriores.map((usuario) => {
                if (usuario._id === idUsuarioAlvo) {
                    return { ...usuario, isAdmin: !usuario.isAdmin }
                }
                return usuario;
            }));
        } catch (erro) {
            console.error(erro)
        }
    }
    
    const handleUpdateEmpresa = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.put(`/empresa/${empresa._id}`, { nome: empresa.nome, cnpj: empresa.cnpj })
            setEmpresa(response.data)
            alert("Dados da empresa atualizados.")
        }catch(erro){
            console.error(erro)
        }
    }

    return (
        <>
            <Cabecalho></Cabecalho>
            <Container className="page-shell">
                {(isAdmin) ? (
                    <div className="card-surface p-4 mb-4">
                        <h1 className="section-title">Dados da empresa</h1>
                        <Form className="mt-3" onSubmit={handleUpdateEmpresa}>
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
                                    name="cnpj"
                                    type="text" 
                                    ref={cnpjRef}
                                    placeholder="00.111.222/3333-44"
                                    value={empresa.cnpj}
                                    onChange={changeEmpresa}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit">Salvar alterações</Button>
                        </Form>
                    </div>
                ):(
                    <div className="card-surface p-4 mb-4">
                        <h1 className="section-title">Empresa</h1>
                        <p className="mb-1 fw-semibold">{empresa.nome}</p>
                        <p className="small-muted mb-0">{empresa.cnpj}</p>
                    </div>
                )}
                <div className="card-surface p-4">
                    <h2 className="section-title">Usuários</h2>
                    <Table responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                {isAdmin && <th>Administrador</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario._id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    {isAdmin && (
                                        <td>
                                            {(usuario._id == idUsuario) ? 
                                                (<Button disabled>Indisponível</Button>) : 
                                                (usuario.isAdmin ?
                                                    (<Button onClick={() => handleToggleAdmin(usuario._id)}>Remover admin</Button>) :
                                                    (<Button onClick={() => handleToggleAdmin(usuario._id)}>Tornar admin</Button>)
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}

export default Empresa
