// components/ListagemEscolhidaGroup.jsx
"use client";
import { Row, Col, ListGroup, Button, Alert } from 'react-bootstrap';

export default function ListagemEscolhidaGroup({
  titulo,
  itens,
  onRemoverItem,
  onUsarNivel,
  pontosDisponiveis,
  textoNenhumItem = "Nenhum item adicionado."
}) {
  return (
    <Row className="mb-4">
      <Col xs={12}>
        <h5>{titulo}</h5>
        
        {itens.length === 0 ? (
          <Alert variant="info">{textoNenhumItem}</Alert>
        ) : (
          <ListGroup>
            {itens.map((item) => (
              <ListGroup.Item key={item.id} className="mb-3">
                <Row className="align-items-center">
                  <Col xs={12} md={10}>
                    <div className="fw-bold">{item.nome}</div>
                    <p className="mb-2 text-muted">{item.descricao}</p>
                    
                    {item.niveis && item.niveis.map(nivel => (
                      <Row className="mb-2" key={nivel.nivel}>
                        <Col xs={12} md={8}>
                          <p className="mb-1"><strong>Nv. {nivel.nivel}:</strong> {nivel.descricao}</p>
                          <p className="mb-1 text-muted">
                            Custo: {nivel.ptUso} pts | Status: {nivel.usado || pontosDisponiveis < nivel.ptUso ? 'Usado' : 'Disponível'}
                          </p>
                        </Col>
                        <Col xs={12} md={4} className="d-grid">
                          <Button
                            variant={nivel.usado ? "outline-secondary" : "outline-primary"}
                            size="sm"
                            onClick={() => onUsarNivel(item.id, nivel)}
                            disabled={nivel.usado || pontosDisponiveis < nivel.ptUso}
                          >
                            {nivel.usado ? 'Usado' : 'Usar'}
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col xs={12} md={2} className="d-grid mt-2 mt-md-0">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onRemoverItem(item.id)}
                    >
                      Remover
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}