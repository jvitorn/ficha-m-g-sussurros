"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ContentFichaNome() {
  const [nomePersonagem, setNomePersonagem] = useState('');
  const [corGrimorio, setCorGrimorio] = useState('');

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formNomePersonagem">
            <Form.Label>Personagem</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Personagem"
              value={nomePersonagem}
              onChange={(e) => setNomePersonagem(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCorGrimorio">
            <Form.Label>Cor do Grimório</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cor do Grimório"
              value={corGrimorio}
              onChange={(e) => setCorGrimorio(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}