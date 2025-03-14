"use client";
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';
// Contexto para gerenciamento de estado global dos atributos
import { useFicha } from "@/context/fichaContext";

export default function ContentFichaManaHp() {
  // Busca os dados e funções do contexto de atributos
  const {
   hpTotal,
   manaTotal
  } = useFicha();

  const [manaDisponivel, setManaDisponivel] = useState(manaTotal || 0);
  const [hpDisponivel, setHpDisponivel] = useState(manaTotal || 0);

  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} e - Evento de mudança do select
   */
  const handleManaDisponivel = (e) => {
    setManaDisponivel(e.target.value)
  };
  
  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} e - Evento de mudança do select
   */
  const handleHpDisponivel = (e) => {
    setHpDisponivel(e.target.value)
  };

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
                onChange={handleManaDisponivel}
                className={clsx({
                  'text-danger': manaDisponivel < 0,
                  'text-info': manaDisponivel > manaTotal
                })}
                name="mana.disponivel" // ← Name adicionado
              />
            </Col>
            {/* Pontos totais de mana */}
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={manaTotal}
                disabled
                readOnly
                name="mana.total" // ← Name adicionado
              />
            </Col>
          </Row>
        </Col>
        {/* Vida */}
        <Col xs={12} md={6} className="text-center">
          <SubtituloFicha texto='HP' />
          <Row>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                value={hpDisponivel}
                onChange={handleHpDisponivel}
                className={
                  clsx(
                    {
                      'text-danger' : hpDisponivel < 0,
                      'text-info': hpDisponivel > hpTotal
                    }
                )}
                name="hp.disponivel" // ← Name adicionado
              />
            </Col>

            {/* Pontos totais do nível */}
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={hpTotal}
                disabled
                readOnly
                name="hp.total" // ← Name adicionado
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}