"use client";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
// Componente customizado de subtítulo
import SubtituloFicha from "@/components/subtituloFicha";

const RACA_LIST = [
  {
    id: 1,
    nome: "Humano",
    habilidade:"ser humano",
    descricao: "aqui é a raça humana",
    vantagens: "sem vantagem",
    desvantagens: "Vida normal, sem buff",
  },
  { 
    id: 2, 
    nome: "Elfo",
    habilidade:"Libelula",
    descricao: "Aqui sao os elfos",
    vantagens: "muita mana",
    desvantagens: "Pouca vida" 
  },
  { id: 3, nome: "Lumis" },
  { id: 4, nome: "Ignar" },
  { id: 5, nome: "Floresto" },
  { id: 6, nome: "Nebulari" },
  { id: 7, nome: "Draconiano" },
  { id: 8, nome: "Espectral" },
];

const CLASSE_LIST = [
  { 
    id: 1, 
    nome: "Suporte",
    formulas: [
      {
        name:"HP", 
        estrutura: "10 + (CM x 2) + Nivel x 6",
      },
    ]
  },
  { id: 2, nome: "Longo" },
  { id: -3, nome: "Criação" },
  { id: 4, nome: "Corpo a Corpo" },
  { id: 5, nome: "Especialista" },
];

const SUBCLASSE_LIST = [
  {
    id: 1,
    nome: "Mestre das Maldições",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em lançar maldições e debuffs nos inimigos, enfraquecendo-os e tornando-os mais vulneráveis",
    vantagens: "facilidade em criar magias de controle",
    desvantagens: "pouca vida",
  },
  {
    id: 2,
    nome: "Ritualista Místico",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em realizar rituais mágicos que podem alterar o curso de uma batalha.",
    vantagens: "facilidade em criar magias com debuff",
    desvantagens: "pouca vida",
  },
  {
    id: 3,
    nome: "Mestre da Cura",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em curar feridas e restaurar a mana dos aliados, com feitiços poderosos de regeneração.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 4,
    nome: "Lutador Mágico",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Combina habilidades de combate corpo a corpo com feitiços que aumentam sua força e resistência durante o combate",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 5,
    nome: "Mestre das Armaduras",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Especialista em conjurar armaduras mágicas que oferecem defesas únicas e poderosas, tornando-o um verdadeiro tanque em batalha.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 6,
    nome: "Assassino Mágico",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Combina agilidade e precisão com feitiços letais, capaz de infligir danos devastadores em curtos períodos de tempo.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 7,
    nome: "Arqueiro Mágico",
    classe: { id: 3, nome: "Longo Alcance" },
    descricao:
      "Especialista em lançar projéteis mágicos com alta precisão, causando danos significativos aos inimigos à distância.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 7,
    nome: "Necromante",
    classe: { id: 3, nome: "Longo Alcance" },
    descricao:
      "Especialista em manipular as forças da vida e da morte, utilizando magias sombrias para drenar a vitalidade dos inimigos e alterar o curso da batalha a seu favor.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
];

export default function ContentFichaClasse() {
  const [raca, setRaca] = useState("");
  const [subclasses, setSubclasses] = useState("");
  const [resFisica, setResFisica] = useState("");
  const [racaSelecionado, setRacaSelecionado] = useState("");
  const [subclasseSelecionado, setSubclasseSelecionado] = useState("");

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  /**
   * Manipula a seleção de raça no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectRaca = (event) => {
    console.log('Handle de raça',event.target.value)
    const racaSelected = RACA_LIST.find((n) => n.id == event.target.value);
    console.log('Raça Selected',racaSelected)
    setRaca(racaSelected)
  };
   /**
   * Manipula a seleção de subclasse no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectSubClasse = (event) => {
    const subClasseSelected = SUBCLASSE_LIST.find((s)=>s.id == event.target.value)
    setSubclasseSelecionado(subClasseSelected)
  }

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
                value={raca}
                onChange={handleSelectRaca}
                className="mb-3"
              >
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
                value={raca?.habilidade || ""}
                readOnly
              />
              <Form.Label>Descrição Geral</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={raca?.descricao || ""}
                readOnly
              />
              <Row>
                <Col md={6}>
                  <Form.Label>Vantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={raca?.vantagens || ""}
                    readOnly
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Desvantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={raca?.desvantagens || ""}
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
            value={racaSelecionado}
            onChange={handleSelectRaca}
            className="mb-3"
          >
            {CLASSE_LIST.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </Form.Select>
          <SubtituloFicha texto="SubClasse" />
          <Form.Select
            value={subclasseSelecionado}
            onChange={handleSelectSubClasse}
            className="mb-3"
          >
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
            value={subclasseSelecionado?.descricao || ""}
            readOnly
          />
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>Vantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionado?.vantagens || ""}
                readOnly
              />
            </Col>
            <Col md={6}>
              <Form.Label>Desvantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionado?.desvantagens || ""}
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
