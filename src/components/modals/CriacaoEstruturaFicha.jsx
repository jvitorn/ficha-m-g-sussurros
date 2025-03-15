"use client";

import { Modal } from "react-bootstrap";
import ClassForm from "@/components/forms/ClassForm";
import SubClassForm from "@/components/forms/SubClassForm";
import RaceForm from "@/components/forms/RaceForm"; // Importe o RaceForm

const CriacaoModal = ({ show, onHide, tipo }) => {
  const handleSubmit = (data) => {
    console.log("Dados do formulário:", data);
    onHide(); // Fecha o modal após o envio
  };

  const getTitle = () => {
    switch (tipo) {
      case "classe":
        return "Criar Nova Classe";
      case "subclasse":
        return "Criar Nova SubClasse";
      case "raca":
        return "Criar Nova Raça";
      default:
        return "Criar Novo Item";
    }
  };

  const renderForm = () => {
    switch (tipo) {
      case "classe":
        return <ClassForm onSubmit={handleSubmit} onCancel={onHide} />;
      case "subclasse":
        return <SubClassForm onSubmit={handleSubmit} onCancel={onHide} />;
      case "raca":
        return <RaceForm onSubmit={handleSubmit} onCancel={onHide} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );
};

export default CriacaoModal;
