import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import '../assets/css/App.css'
import type IInformacoes from '../interfaces/IInformacoes'
import type ICustomizacoes from '../interfaces/ICustomizacoes';
import BarraLateral from '../components/BarraLateral'
import Previsualizacao from '../components/Previsualizacao';

function App() {
  const [informacoesAssinatura, setInformacoesAssinatura] = useState<IInformacoes>({
    nome: "",
    setor: "",
    cargo: "",
    telefone: "",
    ramal: "",
    whatsapp: "",
    email: "",
    website: "",
    endereco: "",
    foto: ""
  });
  const [customizacoesAssinatura, setCustomizacoesAssinatura] = useState<ICustomizacoes>({
    corBackground: "#FFFFFF",
    degradeSim: "false",
    degradeCor: "#FFFFFF",
    degradeDirecao: "to right",
    estiloFont: "Arial",
    corFont: "#000000",
    fontSizeNome: 32,
    fontBoldNome: "normal",
    fontSizeSetorCargo: 24,
    fontBoldSetorCargo: "normal",
    fontSizeDados: 16,
    posicaoFoto: "first",
    formatoFoto: "quadrado",
    rodapeSim: "false",
    rodapeCor: "#FFFFFF"
  });

  return (
    <Container fluid className='px-4 pt-3'>
      <Row>
        {/*Corrigir visualização para mobile, está bugada*/}
        <Col id="colunaLateral" md="auto">
          <h1>Builder</h1>
          <BarraLateral informacoes={informacoesAssinatura}
            setInformacoes={setInformacoesAssinatura}
            customizacoes={customizacoesAssinatura}
            setCustomizacoes={setCustomizacoesAssinatura}
          />
        </Col>
        <Col sm>
          <Previsualizacao informacoes={informacoesAssinatura} customizacoes={customizacoesAssinatura} />
        </Col>
      </Row>
    </Container>
  )
}

export default App