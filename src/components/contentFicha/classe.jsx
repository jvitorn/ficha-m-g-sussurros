"use client";
import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function ContentFichaClasse() {
  const [raca, setRaca] = useState('');
  const [subclasses, setSubclasses] = useState('');
  const [resFisica, setResFisica] = useState('');

  return (
    <>
      {/* Raça, Subclasses, Resistências */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Raça</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Elfo"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Subclasses</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Guerreiro Arcano"
            value={subclasses}
            onChange={(e) => setSubclasses(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Resistência Física</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: +2"
            value={resFisica}
            onChange={(e) => setResFisica(e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
}
