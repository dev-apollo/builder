import { Container, Row, Col, Image } from "react-bootstrap"
import "../assets/css/Previsualizacao.css"
import type IInformacoes from "../interfaces/IInformacoes"
import type ICustomizacoes from "../interfaces/ICustomizacoes"
import type {RefObject} from "react"

interface PrevisualizacaoProps {
    informacoes: IInformacoes
    customizacoes: ICustomizacoes
    previsualizacaoRef?: RefObject<HTMLDivElement | null>
}


function Previsualizacao({ informacoes, customizacoes, previsualizacaoRef }: PrevisualizacaoProps) {
    return (
        <Container id="previsualizacao"
            style={{
                backgroundColor: `${customizacoes.corBackground}`,
                backgroundImage: ((customizacoes.degradeSim === "true") ? (`linear-gradient(${customizacoes.degradeDirecao}, ${customizacoes.corBackground}, ${customizacoes.degradeCor})`) : ("none")),
                color: `${customizacoes.corFont}`,
                fontFamily: `${customizacoes.estiloFont}, Arial, sans-serif`
            }}
            ref={previsualizacaoRef}>
            <Row>
                {(informacoes.foto) && (
                    <Col className="p-0" 
                        md="auto"
                        xs={{order: customizacoes.posicaoFoto}}
                        >
                        <div id="container-foto"
                        style={{
                            borderRadius: ((customizacoes.formatoFoto === "circulo") ? ("50%") : ("10px"))
                        }}>
                            <Image id="foto" 
                                fluid 
                                src={informacoes.foto}
                            />
                        </div>
                    </Col>
                )}
                <Col className="py-3 px-4">
                    <p style={{
                        fontSize: `${customizacoes.fontSizeNome}px`,
                        fontWeight: `${customizacoes.fontBoldNome}`
                    }}>{informacoes.nome}</p>
                    <p style={{
                        fontSize: `${customizacoes.fontSizeSetorCargo}px`,
                        fontWeight: `${customizacoes.fontBoldSetorCargo}`
                    }}>{informacoes.setor} {(informacoes.setor && informacoes.cargo) && ("|")} {informacoes.cargo}</p>
                    <p style={{
                        fontSize: `${customizacoes.fontSizeDados}px`
                    }}>{informacoes.telefone} {(informacoes.telefone && informacoes.ramal) && ("|")} {informacoes.ramal}</p>
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
                </Col>
            </Row>
            {(customizacoes.rodapeSim === "true") && (<div id="rodape" style={{backgroundColor: `${customizacoes.rodapeCor}`, height: "20px"}}></div>)}
        </Container>
    )
}

export default Previsualizacao