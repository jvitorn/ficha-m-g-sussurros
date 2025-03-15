"use client";

import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import CriacaoModal from "@/components/modals/CriacaoEstruturaFicha";

const CreationButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);


  /**
   * Função chamada quando o modal fechado. Zera o estado
   * do tipo de estrutura selecionado e fecha o modal.
   */
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTipo(null);
  };

  /**
   * Fun o chamada quando um botão de criar estrutura 
   *  clicado. Abre o modal com o formulário para criar a
   * estrutura do tipo especificado.
   *
   * @param {string} tipo - Tipo de estrutura a ser criada,
   *  pode ser "classe", "subclasse" ou "raca".
   */
  const handleModalOpen = (tipo) => {
    setSelectedTipo(tipo);
    setShowModal(true);
  };

  const buttons = [
    { tipo: "classe", label: "Criar Classe", variant: "outline-primary" },
    { tipo: "subclasse", label: "Criar SubClasse", variant: "outline-success" },
    { tipo: "raca", label: "Criar Raça", variant: "outline-info" },
  ];

  return (
    <>
      <Row className="mb-3 text-center">
        <Col md={12} className="d-flex justify-content-center gap-3">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              onClick={() => handleModalOpen(button.tipo)}
            >
              {button.label}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Modal de Criação */}
      <CriacaoModal
        show={showModal}
        onHide={handleModalClose}
        tipo={selectedTipo}
      />
    </>
  );
};

export default CreationButtons;
