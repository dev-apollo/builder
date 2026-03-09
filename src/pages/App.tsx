import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import '../assets/css/App.css'
import type IInformacoes from '../interfaces/IInformacoes'
import BarraLateral from '../components/BarraLateral'
import Previsualizacao from '../components/Previsualizacao';
import type ICustomizacoes from '../interfaces/ICustomizacoes';

function App() {
  //Inicializar no modelo
  const [informacoesAssinatura, setInformacoesAssinatura] = useState<IInformacoes>({
    nome: "",
    setor: "",
    cargo: "",
    telefone: "",
    ramal: "",
    whatsapp: "",
    email: "",
    website: "",
    endereco: ""
  });
  const [customizacoesAssinatura, setCustomizacoesAssinatura] = useState<ICustomizacoes>({
    corBackground: "#FFFFFF",
    corFont: "#000000",
    fontSizeNome: 32,
    fontBoldNome: "normal",
    fontSizeSetorCargo: 24,
    fontBoldSetorCargo: "normal",
    fontSizeDados: 16
  });

  return (
    <Container fluid className='py-3 px-4'>
      <Row>
        <Col md="auto" className='mb-4'>
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