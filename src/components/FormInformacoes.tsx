import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Button, Form } from "react-bootstrap"
import "../assets/css/FormInformacoes.css"
import type IInformacoes from "../interfaces/IInformacoes"

interface FormInformacoesProps {
    informacoes: IInformacoes
    setInformacoes: Dispatch<SetStateAction<IInformacoes>>
}

function FormInformacoes({ informacoes, setInformacoes }: FormInformacoesProps) {
    const changeInformacoes = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInformacoes((informacoesAnteriores) => ({
            ...informacoesAnteriores,
            [name]: value
        }))
    }

    const salvarFoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if(files && files.length > 0){
            const objectUrl = URL.createObjectURL(files[0])
            setInformacoes((informacoesAnteriores) => {
                if(informacoesAnteriores.foto) URL.revokeObjectURL(informacoesAnteriores.foto)
                return {
                    ...informacoesAnteriores,
                    foto: objectUrl
                }
            })
            event.target.value = ""
        }
    }

    const removerFoto = () => {
        if(informacoes.foto){
            setInformacoes((informacoesAnteriores) => ({
                ...informacoesAnteriores,
                foto: ""
            }))
            URL.revokeObjectURL(informacoes.foto);
        }
    }

    return (
        <Form>
            <h3>Informações</h3>
            <Form.Group className="mb-2">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text"
                    name="nome"
                    value={informacoes.nome}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Setor:</Form.Label>
                <Form.Control type="text"
                    name="setor"
                    value={informacoes.setor}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Cargo:</Form.Label>
                <Form.Control type="text"
                    name="cargo"
                    value={informacoes.cargo}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control type="tel"
                    name="telefone"
                    value={informacoes.telefone}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Ramal:</Form.Label>
                <Form.Control type="text"
                    name="ramal"
                    value={informacoes.ramal}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Whatsapp:</Form.Label>
                <Form.Control type="tel"
                    name="whatsapp"
                    value={informacoes.whatsapp}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email"
                    name="email"
                    value={informacoes.email}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Website:</Form.Label>
                <Form.Control type="text"
                    name="website"
                    value={informacoes.website}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Endereço:</Form.Label>
                <Form.Control type="text"
                    name="endereco"
                    value={informacoes.endereco}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Foto:</Form.Label>
                <Form.Control type="file"
                    accept="image/*"
                    onChange={salvarFoto}
                ></Form.Control>
            </Form.Group>
            <Button className="mb-2"
                onClick={removerFoto}
            >Remover foto</Button>
        </Form>
    )
}

export default FormInformacoes