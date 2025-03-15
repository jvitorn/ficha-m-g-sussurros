"use client";

import { Col } from "react-bootstrap";

/**
 * Componente para renderizar um item de informação de um personagem em uma ficha.
 * Recebe como props `label` e `value`, que são utilizados para renderizar o item.
 *
 * @prop {string} label - Texto que ser  exibido acima do valor do item.
 * @prop {string} value - Valor que ser  exibido no item.
 *
 * @returns {ReactElement} - Componente que representa o item de informa o.
 */
const StatItem = ({ label, value }) => {
  return (
    <Col md={2} className="text-center">
      <p className="text-muted">{label}</p>
      <h6 className="fontLine">{value}</h6>
    </Col>
  );
};

export default StatItem;