// components/modals/selecionarMagiaModal.jsx
"use client";
import { Modal, ListGroup, Button } from 'react-bootstrap';

const SelecionarMagiaModal = ({ show, onHide, magiasCadastradas, onSelecionarMagia }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Selecionar Magia para Edição</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {magiasCadastradas.length === 0 ? (
          <p className="text-muted">Nenhuma magia cadastrada.</p>
        ) : (
          <ListGroup>
            {magiasCadastradas.map((magia) => (
              <ListGroup.Item
                key={magia.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{magia.nome}</strong>
                  <p className="mb-0 text-muted">{magia.descricao}</p>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    onSelecionarMagia(magia);
                    onHide();
                  }}
                >
                  Editar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelecionarMagiaModal;