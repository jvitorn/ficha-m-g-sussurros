"use client";
import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function ContentFichaHabilidadesMagicas() {
  const [ptUso, setPtUso] = useState(0);
  const [ptTotais, setPtTotais] = useState(0);
  const [habilidadesList, setHabilidadesList] = useState([
    {
      id: 'CDF',
      titulo: 'Canhão de Fogo',
      ptUso: 3,
      descricao: 'O usuário dispara um canhão de fogo muito poderoso',
    },
    {
      id: 'CURA',
      titulo: 'Cura',
      ptUso: 2,
      descricao: 'O usuário cura um aliado',
    }
  ]);

  return (
    <>
      <Row className="mb-5">
        <Col md={3}>
          <Form.Label>Pontos de Uso</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ex: 03"
            value={ptUso}
            onChange={(e) => setPtUso(Number(e.target.value))}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Pontos Totais</Form.Label>
          <Form.Control
            type="number"
            placeholder="10"
            disabled
            value={ptTotais}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={9}>
          <Form.Label>Nome</Form.Label>
          <Form.Select>
            {habilidadesList.map((habilidade) => (
              <option key={habilidade.id} value={habilidade.id}>{habilidade.titulo}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Custo</Form.Label>
          <Form.Control
            type="number"
            placeholder="10"
            disabled
            value={ptTotais}
          />
        </Col>
        <Col md={12}>
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} disabled />
        </Col>
      </Row>
    </>
  );
}
