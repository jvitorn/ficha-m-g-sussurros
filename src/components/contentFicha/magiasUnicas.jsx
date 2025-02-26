"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ContentFichaMagiasUnicas() {
  const [nomeMagias, setNomeMagias] = useState('');
  const [descricao, setDescricao] = useState('');
  const [descricaoLv, setDescricaoLv] = useState('');

  return (
    <>
      {/* Nome e descrição da magia unica */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formNomeMagia">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ex: Canhão de Fogo"
              value={nomeMagias}
              onChange={(e) => setNomeMagias(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formDescricaoMagia">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Ex: O usuário dispara um canhão de fogo muito poderoso"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formDescricaoLv">
            <Form.Label>Descrição por Level</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: +2"
              value={descricaoLv}
              onChange={(e) => setDescricaoLv(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}