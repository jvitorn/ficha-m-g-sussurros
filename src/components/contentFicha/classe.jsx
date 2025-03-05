"use client";
import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';

const RACA_LIST = [
  { id:1, nome: "Humano",descricao:'aqui é a raça humana', bonus:[], desvantagem:[]},
  { id:2, nome: "Elfo"}
]

const  CLASSE_LIST = [
  { id:1, nome:'Suporte'},
  { id:1, nome:'Longo'}
]

export default function ContentFichaClasse() {
  const [raca, setRaca] = useState('');
  const [subclasses, setSubclasses] = useState('');
  const [resFisica, setResFisica] = useState('');
  const [racaSelecionado,setRacaSelecionado] = useState('');

  /**
   * Manipula a seleção de raça no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectRaca = (event) => {
    const nivel = RACA_LIST.find(n => n.id === event.target.value);

    console.log(nivel)
  };

  return (
    <>
    {/* Seção de nível e pontos de atribuição */}
    <Row className="mb-3">
        {/* Dropdown de seleção de nível */}
        <Col xs={12} md={6}>
        <Row>
          <Col xs={12} md={12}>
          <SubtituloFicha texto='Raça' />
          <Form.Select
            value={racaSelecionado}
            onChange={handleSelectRaca}
            className="mb-3"
          >
            {RACA_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </Form.Select>
          <SubtituloFicha texto='Caracteristicas da Raça' />
          <Form.Label>Habilidade</Form.Label>
          <Form.Control 
           type='text'
            value={racaSelecionado?.descricao || ''}
            readOnly
          />
          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={racaSelecionado?.descricao || ''}
            readOnly
          />
          <Row>
            <Col md={6}>
              <Form.Label>Vantagens</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                value={racaSelecionado?.descricao || ''}
                readOnly
              />
            </Col>
            <Col md={6}>
            <Form.Label>Desvantagens</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={racaSelecionado?.descricao || ''}
              readOnly
            />
            </Col>
          </Row>
          
        
          </Col>
        </Row>
         
        </Col>
        <Col xs={12} md={6}>
          <SubtituloFicha texto='Classe' />
          <Form.Select
            value={racaSelecionado}
            onChange={handleSelectRaca}
            className="mb-3"
          >
            {CLASSE_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </Form.Select>
          <SubtituloFicha texto='SubClasse' />
          <Form.Select
            value={racaSelecionado}
            onChange={handleSelectRaca}
            className="mb-3"
          >
            {CLASSE_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </Form.Select>
          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control 
           as='textarea'
           rows={3}
            value={racaSelecionado?.descricao || ''}
            readOnly
          />
        </Col>
      </Row>
    </>
  );
}
