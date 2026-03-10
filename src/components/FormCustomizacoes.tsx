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
                <Form.Label>Posição da foto:</Form.Label>
                <Form.Select name="posicaoFoto"
                    value={customizacoes.posicaoFoto}
                    onChange={changeInformacoes}>
                    <option value={"first"}>Esquerda</option>
                    <option value={"last"}>Direita</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Formato da foto:</Form.Label>
                <Form.Select name="formatoFoto"
                    value={customizacoes.formatoFoto}
                    onChange={changeInformacoes}>
                    <option value={"quadrado"}>Quadrado</option>
                    {/*Programar formato de foto circular*/}
                    <option value={"circulo"}>Círculo</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Cor de fundo:</Form.Label>
                <Form.Control type="color"
                    name="corBackground"
                    value={customizacoes.corBackground}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Degradê no fundo:</Form.Label>
                <Form.Select name="degradeSim"
                    value={customizacoes.degradeSim}
                    onChange={changeInformacoes}>
                    <option value={"false"}>Não</option>
                    <option value={"true"}>Sim</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Segunda cor para degradê:</Form.Label>
                <Form.Control type="color"
                    name="degradeCor"
                    value={customizacoes.degradeCor}
                    onChange={changeInformacoes}
                    disabled={(customizacoes.degradeSim === "false")}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Direção do degradê:</Form.Label>
                <Form.Select name="degradeDirecao"
                    value={customizacoes.degradeDirecao}
                    onChange={changeInformacoes}
                    disabled={(customizacoes.degradeSim === "false")}>
                    <option value={"to right"}>Para direita</option>
                    <option value={"to left"}>Para esquerda</option>
                    <option value={"to top"}>Para cima</option>
                    <option value={"to bottom"}>Para baixo</option>
                </Form.Select>
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
            <Form.Group className="mb-2">
                <Form.Label>Rodapé na assinatura:</Form.Label>
                <Form.Select name="rodapeSim"
                    value={customizacoes.rodapeSim}
                    onChange={changeInformacoes}>
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Cor do rodapé:</Form.Label>
                <Form.Control type="color"
                    name="rodapeCor"
                    disabled={(customizacoes.rodapeSim === "false")}
                    value={customizacoes.rodapeCor}
                    onChange={changeInformacoes}
                ></Form.Control>
            </Form.Group>
        </Form>
    )
}

export default FormCustomizacoes