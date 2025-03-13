"use client";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
// Contexto para gerenciamento de estado global dos atributos
import { useFicha } from "@/context/fichaContext";
// Componente customizado de subtítulo
import SubtituloFicha from "@/components/subtituloFicha";


export default function ContentFichaClasse() {
  // Busca os dados e funções do contexto de atributos
  const {
    RACA_LIST,
    CLASSE_LIST,
    SUBCLASSE_LIST,
    classeSelecionada,setClasseSelecionada,
    racaSelecionada, setRacaSelecionada,
    subclasseSelecionada, setSubclasseSelecionada,
  } = useFicha();

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  /**
   * Manipula a seleção de raça no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectRaca = (event) => {
    const raca = RACA_LIST.find(r => r.id == event.target.value);
    setRacaSelecionada(raca || null);
  };
  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectClasse = (event) => {
    const id = parseInt(event.target.value); // Converter para número
    const classe = CLASSE_LIST.find(c => c.id === id);
    
    // if(classe?.formulas) { // Verificar existência de fórmulas
    //   const hpFormula = classe.formulas.find(f => f.name === "HP");
    //   const manaFormula = classe.formulas.find(f => f.name === "MP");
      
    //   if(hpFormula) setHpTotal(calcularFormulasClasse(hpFormula));
    //   if(manaFormula) setMana(calcularFormulasClasse(manaFormula));
    // }
    
    setClasseSelecionada(classe || null);
  };
  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectSubClasse = (event) => {
    const subclasse = SUBCLASSE_LIST.find(s => s.id == event.target.value);
    setSubclasseSelecionada(subclasse || null);
  };

  // ---------------------------------------------------------------
  // RENDERIZAÇÃO DO COMPONENTE
  // ---------------------------------------------------------------

  return (
    <>
      {/* Seção de nível e pontos de atribuição */}
      <Row className="mb-3">
        {/* Dropdown de seleção de nível */}
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12} md={12}>
              <SubtituloFicha texto="Raça" />
              <Form.Select
                value={racaSelecionada?.id || ""} // Usar apenas o ID como valor
                onChange={handleSelectRaca}
                className="mb-3"
              >
                <option value="">Selecione uma Raça</option>
                {RACA_LIST.map(({ id, nome }) => (
                  <option key={id} value={id}>
                    {nome}
                  </option>
                ))}
              </Form.Select>
              <SubtituloFicha texto="Caracteristicas da Raça" />
              <Form.Label>Habilidade</Form.Label>
              <Form.Control
                type="text"
                value={racaSelecionada?.habilidade || ""}
                readOnly
              />
              <Form.Label>Descrição Geral</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={racaSelecionada?.descricao || ""}
                readOnly
              />
              <Row>
                <Col md={6}>
                  <Form.Label>Vantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.vantagens || ""}
                    readOnly
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Desvantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.desvantagens || ""}
                    readOnly
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <SubtituloFicha texto="Classe" />
          <Form.Select
            value={classeSelecionada?.id || ""}
            onChange={handleSelectClasse}
            className="mb-3"
          >
            <option value="">Selecione uma Classe</option>
            {CLASSE_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </Form.Select>
          <SubtituloFicha texto="SubClasse" />
          <Form.Select
            value={subclasseSelecionada?.id || ""}
            onChange={handleSelectSubClasse}
            className="mb-3"
          >
            <option value="">Selecione uma Sub Classe</option>
            {SUBCLASSE_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={subclasseSelecionada?.descricao || ""}
            readOnly
          />
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>Vantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.vantagens || ""}
                readOnly
              />
            </Col>
            <Col md={6}>
              <Form.Label>Desvantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.desvantagens || ""}
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
