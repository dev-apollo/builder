import { Form } from "react-bootstrap"
import "../assets/css/FormCustomizacoes.css"
import type ICustomizacoes from "../interfaces/ICustomizacoes"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"

interface FormCustomizacoesProps {
    customizacoes: ICustomizacoes
    setCustomizacoes: Dispatch<SetStateAction<ICustomizacoes>>
}

function FormCustomizacoes({ customizacoes, setCustomizacoes }: FormCustomizacoesProps) {
    const changeInformacoes = (event: ChangeEvent<any>) => {
        const { name, value } = event.target
        setCustomizacoes((customizacoesAnteriores) => ({
            ...customizacoesAnteriores,
            [name]: value
        }))
    }

    return (
        <Form>
            <h3>Customizações</h3>
            <Form.Group className="mb-2">
                <Form.Label>Cor de fundo:</Form.Label>
                <Form.Control type="color"
                    name="corBackground"
                    value={customizacoes.corBackground}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Cor dos textos:</Form.Label>
                <Form.Control type="color"
                    name="corFont"
                    value={customizacoes.corFont}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Tamanho da fonte do nome:</Form.Label>
                <Form.Control type="number"
                    name="fontSizeNome"
                    value={customizacoes.fontSizeNome}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Negrito na fonte do nome:</Form.Label>
                <Form.Select name="fontBoldNome"
                    value={customizacoes.fontBoldNome}
                    onChange={changeInformacoes}>
                    <option value="normal">Não</option>
                    <option value="bold">Sim</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Tamanho da fonte do setor e cargo:</Form.Label>
                <Form.Control type="number"
                    name="fontSizeSetorCargo"
                    value={customizacoes.fontSizeSetorCargo}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Negrito na fonte do setor e cargo:</Form.Label>
                <Form.Select name="fontBoldSetorCargo"
                    value={customizacoes.fontBoldSetorCargo}
                    onChange={changeInformacoes}>
                    <option value="normal">Não</option>
                    <option value="bold">Sim</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Tamanho dos dados:</Form.Label>
                <Form.Control type="number"
                    name="fontSizeDados"
                    value={customizacoes.fontSizeDados}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
        </Form>
    )
}

export default FormCustomizacoes