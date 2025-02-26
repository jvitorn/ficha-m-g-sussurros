"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ContentFichaInspiracaoDefesa() {
  const [inspiracao, setInspiracao] = useState(0);
  const [inspiracaoTotal, setInspiracaoTotal] = useState(3);

  return (
    <>
      {/* Raça, Subclasses, Resistências */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formInspiracao">
            <Form.Label>Inspiração</Form.Label>
            <Form.Control
              type="number"
              placeholder="01"
              value={inspiracao}
              onChange={(e) => setInspiracao(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formInspiracaoTotal" className="mt-2">
            <Form.Control
              type="number"
              placeholder="01"
              value={inspiracaoTotal}
              disabled
              readOnly
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}