// components/modals/criarMagiaUnica.jsx
"use client";
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

const CriarMagiaUnicaModal = ({ show, onHide, onSave }) => {
  const [nomeMagia, setNomeMagia] = useState('');
  const [descricaoGeral, setDescricaoGeral] = useState('');
  const [niveis, setNiveis] = useState([]);
  const [proximoNivel, setProximoNivel] = useState(2);

  const handleAdicionarNivel = () => {
    setNiveis([...niveis, { nivel: proximoNivel, descricao: '', usado: false }]);
    setProximoNivel(prev => prev + 1);
  };

  const handleChangeNivel = (index, valor) => {
    const novosNiveis = [...niveis];
    novosNiveis[index].descricao = valor;
    setNiveis(novosNiveis);
  };

  const handleSalvar = () => {
    const novaMagia = {
      id: Date.now().toString(), // Gera um ID único
      nome: nomeMagia,
      descricao: descricaoGeral,
      niveis: niveis
    };

    onSave(novaMagia); // Passa a nova magia para o componente pai
    resetCampos();
  };

  const resetCampos = () => {
    setNomeMagia('');
    setDescricaoGeral('');
    setNiveis([]);
    setProximoNivel(2);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Magia</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNomeMagia">
            <Form.Label>Nome da Magia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Canhão de Fogo"
              value={nomeMagia}
              onChange={(e) => setNomeMagia(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescricaoGeral">
            <Form.Label>Descrição Geral</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descrição básica da magia"
              value={descricaoGeral}
              onChange={(e) => setDescricaoGeral(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Níveis da Magia</h5>
            <Button 
              variant="outline-success" 
              size="sm"
              onClick={handleAdicionarNivel}
              disabled={!nomeMagia || !descricaoGeral}
            >
              <PlusLg className="me-1" /> Adicionar Nível
            </Button>
          </div>

          {niveis.map((nivel, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <Form.Group controlId={`formNivel${index}`}>
                <Form.Label>Nível {nivel.nivel}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={`Descrição do nível ${nivel.nivel}...`}
                  value={nivel.descricao}
                  onChange={(e) => handleChangeNivel(index, e.target.value)}
                />
              </Form.Group>
            </div>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSalvar}
          disabled={!nomeMagia || !descricaoGeral || niveis.length === 0}
        >
          Salvar Magia
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CriarMagiaUnicaModal;