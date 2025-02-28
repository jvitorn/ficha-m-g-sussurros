// components/modals/criarMagiaUnica.jsx
"use client";
import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

const CUSTO_MANA_POR_NIVEL = [
  { nivel: 1, ptUso: 2 },
  { nivel: 2, ptUso: 4 },
  { nivel: 3, ptUso: 7 },
  { nivel: 4, ptUso: 10 },
  { nivel: 5, ptUso: 13 },
  { nivel: 6, ptUso: 16 },
  { nivel: 7, ptUso: 20 },
  { nivel: 8, ptUso: 25 }
];

const NIVEL_MAXIMO = 8;

const CriarMagiaUnicaModal = ({ show, onHide, onSave, magiaParaEditar }) => {
  const [nomeMagia, setNomeMagia] = useState('');
  const [descricaoGeral, setDescricaoGeral] = useState('');
  const [niveis, setNiveis] = useState([]);
  const [proximoNivel, setProximoNivel] = useState(2);
  const [erro, setErro] = useState('');

  // Preenche os campos se estiver editando
  useEffect(() => {
    if (magiaParaEditar) {
      setNomeMagia(magiaParaEditar.nome);
      setDescricaoGeral(magiaParaEditar.descricao);
      setNiveis(magiaParaEditar.niveis);
      setProximoNivel(magiaParaEditar.niveis.length + 1);
    } else {
      resetCampos();
    }
  }, [magiaParaEditar]);

  const handleAdicionarNivel = () => {
    if (proximoNivel > NIVEL_MAXIMO) {
      setErro(`Nível máximo permitido é ${NIVEL_MAXIMO}`);
      return;
    }

    const custoNivel = CUSTO_MANA_POR_NIVEL.find(n => n.nivel === proximoNivel)?.ptUso || 0;
    
    setNiveis([...niveis, { 
      nivel: proximoNivel, 
      descricao: '',
      ptUso: custoNivel,
      usado: false 
    }]);
    
    setProximoNivel(prev => prev + 1);
    setErro('');
  };

  const handleChangeNivel = (index, valor) => {
    const novosNiveis = [...niveis];
    novosNiveis[index].descricao = valor;
    setNiveis(novosNiveis);
  };

  const handleSalvar = () => {
    const novaMagia = {
      id: magiaParaEditar ? magiaParaEditar.id : Date.now().toString(),
      nome: nomeMagia,
      descricao: descricaoGeral,
      niveis: niveis
    };

    onSave(novaMagia);
    resetCampos();
  };

  const resetCampos = () => {
    setNomeMagia('');
    setDescricaoGeral('');
    setNiveis([]);
    setProximoNivel(2);
    setErro('');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{magiaParaEditar ? 'Editar Magia' : 'Criar Nova Magia'}</Modal.Title>
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
            <div>
              <h5 className="mb-0">Níveis da Magia</h5>
              <small className="text-muted">Máximo: nível {NIVEL_MAXIMO}</small>
            </div>
            <Button 
              variant="outline-success" 
              size="sm"
              onClick={handleAdicionarNivel}
              disabled={!nomeMagia || !descricaoGeral || proximoNivel > NIVEL_MAXIMO}
            >
              <PlusLg className="me-1" /> Adicionar Nível
            </Button>
          </div>

          {erro && <Alert variant="danger" className="mb-3">{erro}</Alert>}

          {niveis.map((nivel, index) => {
            const custoNivel = CUSTO_MANA_POR_NIVEL.find(n => n.nivel === nivel.nivel)?.ptUso || 0;
            
            return (
              <div key={index} className="mb-3 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label>Nível {nivel.nivel}</Form.Label>
                  <small className="text-muted">Custo: {custoNivel} MB</small>
                </div>
                
                <Form.Group controlId={`formNivel${index}`}>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder={`Descrição do nível ${nivel.nivel}...`}
                    value={nivel.descricao}
                    onChange={(e) => handleChangeNivel(index, e.target.value)}
                  />
                </Form.Group>
              </div>
            );
          })}
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
          {magiaParaEditar ? 'Salvar Alterações' : 'Salvar Magia'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CriarMagiaUnicaModal;