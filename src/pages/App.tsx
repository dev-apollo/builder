import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap';
import '../assets/css/App.css'
import type IInformacoes from '../interfaces/IInformacoes'
import type ICustomizacoes from '../interfaces/ICustomizacoes';
import BarraLateral from '../components/BarraLateral'
import Previsualizacao from '../components/Previsualizacao';
import Cabecalho from '../components/Cabecalho';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router';
import * as htmlToImage from 'html-to-image';

function App() {
  const previsualizacaoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const { idAssinatura } = useParams();
  const [idUsuario, setIdUsuario] = useState("");
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
    formatoFoto: "quadrado"
  });

  const handleBaixarImagem = () => {
    if (previsualizacaoRef.current == null) {
      console.error("Pré-visualização não encontrada.");
      return;
    }
    htmlToImage.toPng(previsualizacaoRef.current, {pixelRatio: 1})
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'minha-assinatura.png';
      link.href = dataUrl;
      link.click();
    }).catch((error) => {
      console.error('Erro ao gerar imagem:', error);
    })
  }

  const handleSalvarAssinatura = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const assinatura = {
      idUsuario,
      ...informacoesAssinatura,
      ...customizacoesAssinatura
    }
    try {
      if(idAssinatura){
        await api.put(`/assinatura/${idAssinatura}/${idUsuario}`, assinatura)
        return;
      }
      const response = await api.post("/assinatura", assinatura)
      console.log(response.data);
      navigate("/homepage")
    } catch (erro) {
      console.error(erro)
    }
  }

  useEffect(() => {
    const sincronizarDados = async () => {
    const localUser = localStorage.getItem("usuario");
    try {
      if (localUser) {
        const jsonUser = JSON.parse(localUser);
        setIdUsuario(jsonUser.usuario._id);
        if(idAssinatura){
          const response = await api.get(`/assinatura/${idAssinatura}/${jsonUser.usuario._id}`);
          if(response){
            setInformacoesAssinatura({
              nome: response.data.nome,
              setor: response.data.setor,
              cargo: response.data.cargo,
              telefone: response.data.telefone,
              ramal: response.data.ramal,
              whatsapp: response.data.whatsapp,
              email: response.data.email,
              website: response.data.website,
              endereco: response.data.endereco
            });
            setCustomizacoesAssinatura({
              corBackground: response.data.corBackground,
              degradeSim: response.data.degradeSim,
              degradeCor: response.data.degradeCor,
              degradeDirecao: response.data.degradeDirecao,
              estiloFont: response.data.estiloFont,
              corFont: response.data.corFont,
              fontSizeNome: response.data.fontSizeNome,
              fontBoldNome: response.data.fontBoldNome,
              fontSizeSetorCargo: response.data.fontSizeSetorCargo,
              fontBoldSetorCargo: response.data.fontBoldSetorCargo,
              fontSizeDados: response.data.fontSizeDados,
              posicaoFoto: response.data.posicaoFoto,
              formatoFoto: response.data.formatoFoto
            });
          }
        }
      } else {
        setIdUsuario("invalido");
      }
    } catch (erro) {
      console.error(erro)
    }
  }
  sincronizarDados();
}, []);

  return (
    <>
      <Cabecalho></Cabecalho>
      <Container fluid className='app-shell'>
        <Row className="g-4">
          {/*Corrigir visualização para mobile, está bugada*/}
          <Col id="colunaLateral" md="auto" className="sidebar-panel">
            <h1 className="sidebar-title">Builder</h1>
            <BarraLateral informacoes={informacoesAssinatura}
              setInformacoes={setInformacoesAssinatura}
              customizacoes={customizacoesAssinatura}
              setCustomizacoes={setCustomizacoesAssinatura}
            />
          </Col>
          <Col sm className="preview-column">
            <Previsualizacao informacoes={informacoesAssinatura} customizacoes={customizacoesAssinatura} previsualizacaoRef={previsualizacaoRef}/>
          </Col>
        </Row>
        <div className="save-action">
          <Button onClick={handleSalvarAssinatura}>Salvar assinatura</Button>
          <Button variant="outline-secondary" onClick={handleBaixarImagem}>Baixar imagem</Button>
        </div>
      </Container>
    </>
  )
}

export default App
