"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ContentFichaManaHp() {
  const [mana, setMana] = useState(0);
  const [hp, setHp] = useState(0);

  return (
    <>
      {/* Mana & HP */}
      <Row className="mb-3 justify-content-center">
        <Col md={4} className="offset-md-4">
          <Form.Group controlId="formMana">
            <Form.Label>Mana</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ex: 10"
              value={mana}
              onChange={(e) => setMana(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formHp">
            <Form.Label>HP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ex: 10"
              value={hp}
              onChange={(e) => setHp(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}