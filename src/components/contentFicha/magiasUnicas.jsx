"use client";
import { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import SubtituloFicha from '@/components/subtituloFicha';
import CriarMagiaUnicaModal from '@/components/modals/criarMagiaUnica';
import ListagemEscolhidaGroup from '@/components/listagemEscolhidaGroup';

export default function ContentFichaMagiasUnicas() {
  // Estados do componente
  const [showModal, setShowModal] = useState(false);
  const [magiasCadastradas, setMagiasCadastradas] = useState([]);
  const [erro, setErro] = useState('');

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  const handleSalvarMagia = (novaMagia) => {
    // Verifica se a magia já foi cadastrada
    if (magiasCadastradas.some(m => m.nome === novaMagia.nome)) {
      setErro('Esta magia já foi cadastrada!');
      return;
    }

    // Adiciona a nova magia à lista
    setMagiasCadastradas([...magiasCadastradas, novaMagia]);
    setShowModal(false);
    setErro('');
  };

  const handleRemoverMagia = (id) => {
    setMagiasCadastradas(magiasCadastradas.filter(m => m.id !== id));
  };

  const handleUsarNivelMagia = (magiaId, nivel) => {
    setMagiasCadastradas(prev => prev.map(m =>
      m.id === magiaId
        ? {
            ...m,
            niveis: m.niveis.map(n =>
              n.nivel === nivel.nivel
                ? { ...n, usado: true }
                : n
            )
          }
        : m
    ));
  };

  // ---------------------------------------------------------------
  // RENDERIZAÇÃO DO COMPONENTE
  // ---------------------------------------------------------------

  return (
    <>
      {/* Botão para abrir o modal de criação */}
      <Row className="mb-3">
        <Col xs={12}>
          <SubtituloFicha texto="Criar Magia" />
          <Button 
            variant="outline-primary" 
            onClick={() => setShowModal(true)}
          >
            <PlusLg className="me-2" /> Nova Magia
          </Button>
        </Col>
      </Row>

      {/* Modal de Criação de Magia */}
      <CriarMagiaUnicaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSalvarMagia}
      />

      {/* Lista de Magias Cadastradas */}
      <ListagemEscolhidaGroup
        titulo="Magias Cadastradas"
        itens={magiasCadastradas}
        onRemoverItem={handleRemoverMagia}
        onUsarNivel={handleUsarNivelMagia}
        pontosDisponiveis={10} // Defina o valor correto dos pontos disponíveis
        textoNenhumItem="Nenhuma magia cadastrada."
      />

      {/* Exibição de Erros */}
      {erro && (
        <Row className="mb-3">
          <Col xs={12}>
            <Alert variant="danger">{erro}</Alert>
          </Col>
        </Row>
      )}
    </>
  );
}