"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
// Contexto para gerenciamento de estado global dos atributos
import { useFicha } from "@/context/fichaContext";
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';

const INSPIRACAO_TOTAL = 3;

export default function ContentFichaInspiracaoDefesa() {
  const {
    defesaPassiva
  } = useFicha();

  const [inspiracao, setInspiracao] = useState(0);

  return (
    <>
      {/* Inspiração */}
      <Row className="mb-3">
        <Col xs={12} md={6} className='text-center mb-3'>
          <SubtituloFicha texto='Inspiração' /> 
          <Row>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponivel</Form.Label>
              <Form.Control
                type="number"
                placeholder="01"
                value={inspiracao}
                onChange={(e) => setInspiracao(Number(e.target.value))}
              />
            </Col>
              {/* Pontos totais de mana */}
              <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={INSPIRACAO_TOTAL}
                readOnly
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6} className='text-center'>
          <SubtituloFicha texto='Defesa Passiva' />
          <Row>
            <Col xs={12} md={12}>
              <Form.Label>Proteção</Form.Label>
              <Form.Control
                type="number"
                value={defesaPassiva}
                disabled
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}