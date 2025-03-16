"use client";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
// Contexto para gerenciamento de estado global dos atributos
import { useFicha } from "@/contexts/fichaContext";
// Componente customizado de subtítulo
import SubtituloFicha from "@/components/subtituloFicha";

export default function ContentFichaClasse() {
  // Busca os dados e funções do contexto de atributos
  const {
    racaList,
    classeList,
    subclasseList,
    classeSelecionada,
    setClasseSelecionada,
    racaSelecionada,
    setRacaSelecionada,
    subclasseSelecionada,
    setSubclasseSelecionada,
  } = useFicha();

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  /**
   * Manipula a seleção de raça no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectRaca = (event) => {
    const raca = racaList.find((r) => r.id == event.target.value);
    setRacaSelecionada(raca || null);
  };

  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectClasse = (event) => {
    const id = parseInt(event.target.value);
    const classe = classeList.find((c) => c.id === id);
    setClasseSelecionada(classe || null);
  };

  /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectSubClasse = (event) => {
    const subclasse = subclasseList.find((s) => s.id == event.target.value);
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
                value={racaSelecionada?.id || ""}
                onChange={handleSelectRaca}
                className="mb-3"
                name="raca" // ← Name adicionado aqui
              >
                <option value="">Selecione uma Raça</option>
                {racaList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>

              <SubtituloFicha texto="Caracteristicas da Raça" />
              <Form.Label>Habilidade</Form.Label>
              <Form.Control
                type="text"
                value={racaSelecionada?.habilidade || ""}
                readOnly
                name="raca.habilidade" // ← Name adicionado
              />
              <Form.Label>Descrição Geral</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={racaSelecionada?.description || ""}
                readOnly
                name="raca.description" // ← Name adicionado
              />
              <Row>
                <Col md={6}>
                  <Form.Label>Vantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.advantages || ""}
                    readOnly
                    name="raca.advantages" // ← Name adicionado
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Desvantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.disadvantages || ""}
                    readOnly
                    name="raca.disadvantages" // ← Name adicionado
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
            name="classe" // ← Name adicionado aqui
          >
            <option value="">Selecione uma Classe</option>
            {classeList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Select>

          <SubtituloFicha texto="SubClasse" />
          <Form.Select
            value={subclasseSelecionada?.id || ""}
            onChange={handleSelectSubClasse}
            className="mb-3"
            name="subclasse" // ← Name adicionado aqui
          >
            <option value="">Selecione uma Sub Classe</option>
            {subclasseList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Select>

          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={subclasseSelecionada?.description || ""}
            readOnly
            name="subclasse.description" // ← Name adicionado
          />
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>Vantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.advantages || ""}
                readOnly
                name="subclasse.advantages" // ← Name adicionado
              />
            </Col>
            <Col md={6}>
              <Form.Label>Desvantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.disadvantages || ""}
                readOnly
                name="subclasse.disadvantages" // ← Name adicionado
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
