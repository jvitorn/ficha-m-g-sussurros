"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
// Contexto para gerenciamento de estado global dos atributos
import { useFicha } from "@/contexts/fichaContext";

import SubtituloFicha from '../subtituloFicha';

export default function ContentFichaNome() {
 
  const {
    nomePersonagem, setNomePersonagem
  } = useFicha();

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
              value={nomePersonagem || ''}
              onChange={(e) => setNomePersonagem(e.target.value)}
              name="nomePersonagem"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCorGrimorio">
            <SubtituloFicha texto="Cor do Grimório" />
            <Form.Control
              type="text"
              placeholder="Cor do Grimório"
              value={corGrimorio || ''}
              onChange={(e) => setCorGrimorio(e.target.value)}
              name="nomeGrimorio"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}