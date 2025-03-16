"use client";

import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StatItem from "@/components/ui/StatItem";

const getSaudacao = () => {
  const horaAtual = new Date().getHours();

  if (horaAtual >= 6 && horaAtual < 12) return "Bom dia";
  if (horaAtual >= 12 && horaAtual < 18) return "Boa tarde";
  if (horaAtual >= 18 && horaAtual < 24) return "Boa noite";
  return "Ótima madrugada";
};

const WelcomeStats = ({ username, stats }) => {
  const [saudacao, setSaudacao] = useState("");

  useEffect(() => {
    setSaudacao(getSaudacao()); // Atualiza só no cliente
  }, []);

  return (
    <Row className="mb-3">
      <Col md={6}>
        <h3 className="display-5 text-capitalize">
          {saudacao}, {username}!
        </h3>
        <p className="text-muted">Vamos verificar algumas informações</p>
      </Col>
      <StatItem label="Players" value={stats.players} />
      <StatItem label="Fichas" value={stats.fichas} />
      <StatItem label="Campanhas" value={stats.campanhas} />
    </Row>
  );
};

export default WelcomeStats;
