"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import SubtituloFicha from '../subtituloFicha';

export default function ContentFichaNome() {
  const [nomePersonagem, setNomePersonagem] = useState('');
  const [corGrimorio, setCorGrimorio] = useState('');

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formNomePersonagem">
            <SubtituloFicha texto="Nome do Personagem" />
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
            <SubtituloFicha texto="Cor do Grimório" />
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