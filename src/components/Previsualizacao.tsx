import { Container } from "react-bootstrap"
import "../assets/css/Previsualizacao.css"
import type IInformacoes from "../interfaces/IInformacoes"
import type ICustomizacoes from "../interfaces/ICustomizacoes"

interface PrevisualizacaoProps {
    informacoes: IInformacoes
    customizacoes: ICustomizacoes
}

function Previsualizacao({ informacoes, customizacoes }: PrevisualizacaoProps) {
    return (
        <Container id="previsualizacao" 
            style={{
                backgroundColor: `${customizacoes.corBackground}`,
                color: `${customizacoes.corFont}`
        }}>
            {/*Inserir foto*/}
            <p style={{
                fontSize: `${customizacoes.fontSizeNome}px`,
                fontWeight: `${customizacoes.fontBoldNome}`
            }}>{informacoes.nome}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeSetorCargo}px`,
                fontWeight: `${customizacoes.fontBoldSetorCargo}`
            }}>{informacoes.setor} | {informacoes.cargo}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeDados}px`
            }}>{informacoes.telefone} | {informacoes.ramal}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeDados}px`
            }}>{informacoes.whatsapp}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeDados}px`
            }}>{informacoes.email}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeDados}px`
            }}>{informacoes.website}</p>
            <p style={{
                fontSize: `${customizacoes.fontSizeDados}px`
            }}>{informacoes.endereco}</p>
        </Container>
    )
}

export default Previsualizacao