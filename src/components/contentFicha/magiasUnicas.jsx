"use client";
import { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { PlusLg, Pencil } from 'react-bootstrap-icons';
import SubtituloFicha from '@/components/subtituloFicha';
import CriarMagiaUnicaModal from '@/components/modals/criarMagiaUnica';
import ListagemEscolhidaGroup from '@/components/listagemEscolhidaGroup';
import SelecionarMagiaModal from '@/components/modals/selecionarMagiaModal';

export default function ContentFichaMagiasUnicas() {
  // Estados do componente
  const [showCriarModal, setShowCriarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [magiasCadastradas, setMagiasCadastradas] = useState([]);
  const [magiaParaEditar, setMagiaParaEditar] = useState(null);
  const [erro, setErro] = useState('');

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  const handleSalvarMagia = (novaMagia) => {
    if (magiasCadastradas.some(m => m.id === novaMagia.id)) {
      // Editar magia existente
      setMagiasCadastradas(prev =>
        prev.map(m => m.id === novaMagia.id ? novaMagia : m)
      );
    } else {
      // Adicionar nova magia
      setMagiasCadastradas([...magiasCadastradas, novaMagia]);
    }

    setShowCriarModal(false);
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

  const handleEditarMagia = (magia) => {
    setMagiaParaEditar(magia);
    setShowCriarModal(true);
  };

  // ---------------------------------------------------------------
  // RENDERIZAÇÃO DO COMPONENTE
  // ---------------------------------------------------------------

  return (
    <>
      {/* Botões de Ação */}
      <Row className="mb-3">
        <Col xs={12} className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setShowCriarModal(true)}
          >
            <PlusLg className="me-2" /> Nova Magia
          </Button>
          {magiasCadastradas.length > 0 && (
            <Button
              variant="outline-secondary"
              onClick={() => setShowEditarModal(true)}
              disabled={magiasCadastradas.length === 0}
            >
              <Pencil className="me-2" /> Editar Magia
            </Button>
          )}

        </Col>
      </Row>

      {/* Modal de Criação/Edição de Magia */}
      <CriarMagiaUnicaModal
        show={showCriarModal}
        onHide={() => {
          setShowCriarModal(false);
          setMagiaParaEditar(null); // Limpa a magia em edição ao fechar
        }}
        onSave={handleSalvarMagia}
        magiaParaEditar={magiaParaEditar}
      />

      {/* Modal de Seleção de Magia para Edição */}
      <SelecionarMagiaModal
        show={showEditarModal}
        onHide={() => setShowEditarModal(false)}
        magiasCadastradas={magiasCadastradas}
        onSelecionarMagia={handleEditarMagia}
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