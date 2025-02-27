"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';

export default function ContentFichaManaHp() {
  const [mana, setMana] = useState(0);
  const [hp, setHp] = useState(0);
  const [manaDisponivel, setManaDisponivel] = useState(0);
  const [manaTotal, setManaTotal] = useState(0);

  return (
    <>
      <Row className='mb-3'>
        {/* Painel de pontos de atribuição */}
        <Col xs={12} md={6} className="text-center">
          <SubtituloFicha texto='Mana' />
          <Row>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                value={manaDisponivel}
                className={manaDisponivel < 0 ? 'text-danger' : ''} // Destaca negativo
              />
            </Col>
            {/* Pontos totais do nível */}
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={manaTotal}
                disabled
              />
            </Col>
          </Row>
        </Col>
        {/* Painel de pontos de atribuição */}
        <Col xs={12} md={6} className="text-center">
          <SubtituloFicha texto='HP' />
          <Row>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                value={manaDisponivel}
                className={manaDisponivel < 0 ? 'text-danger' : ''} // Destaca negativo
              />
            </Col>

            {/* Pontos totais do nível */}
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={manaTotal}
                disabled
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}