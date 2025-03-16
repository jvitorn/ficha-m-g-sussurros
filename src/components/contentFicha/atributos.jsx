"use client";
import { useState, useMemo } from "react";
import { Row, Col, Form, Alert, Button, Modal } from "react-bootstrap";
import clsx from "clsx";
import { useFicha } from "@/contexts/fichaContext";
import SubtituloFicha from "@/components/subtituloFicha";

export default function ContentFichaAtributos() {
  const {
    atributos,
    atualizarAtributo,
    resetAtributos,
    nivelList,
    nivelSelecionado,
    setNivelSelecionado,
  } = useFicha();

  const [pontosAtribTotal, setPontosAtribTotal] = useState(
    nivelList[0].pontosAtribuicao
  );
  const [erro, setErro] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [proximoNivel, setProximoNivel] = useState(null);

  const pontosAtributosTotal = useMemo(
    () => atributos.reduce((acc, { valor }) => acc + valor, 0),
    [atributos]
  );

  const pontosDisponiveis = useMemo(
    () => pontosAtribTotal - pontosAtributosTotal,
    [pontosAtribTotal, pontosAtributosTotal]
  );

  const handleChangeAttr = (index, newValue) => {
    const valorNumerico = Math.max(Number(newValue) || 0);
    const novosAtributos = atributos.map((attr, i) =>
      i === index ? { ...attr, valor: valorNumerico } : attr
    );

    const novoTotal = novosAtributos.reduce((acc, { valor }) => acc + valor, 0);

    if (novoTotal > pontosAtribTotal) {
      setErro("Pontos de atribuição excedidos!");
      return;
    }

    setErro("");
    atualizarAtributo(atributos[index].sigla, valorNumerico);
  };

  const handleSelectNivel = (event) => {
    const nivel = nivelList.find((n) => n.id == event.target.value);
    if (nivel && nivel.id !== nivelSelecionado) {
      if (pontosAtributosTotal > nivel.pontosAtribuicao) {
        setProximoNivel(nivel);
        setShowConfirmModal(true);
      } else {
        confirmarMudancaNivel(nivel);
      }
    }
  };

  const confirmarMudancaNivel = (nivel, resetAttr) => {
    setNivelSelecionado(nivel.id);
    setPontosAtribTotal(nivel.pontosAtribuicao);
    if (resetAttr) resetAtributos();
    setShowConfirmModal(false);
    setErro("");
  };

  const handleResetAtributos = () => {
    resetAtributos();
    setErro("");
  };

  return (
    <>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Mudança de Nível</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ao mudar para o nível {proximoNivel?.titulo}, todos os pontos de
          atribuição serão resetados. Deseja continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => confirmarMudancaNivel(proximoNivel, true)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mb-3">
        {atributos.map(({ sigla, nome, valor }, index) => (
          <Col xs={4} md={2} className="mb-3" key={sigla}>
            <Form.Label>
              <b>{sigla}</b>
            </Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder={sigla}
              value={valor || ""}
              name={`atributos.${sigla}`}
              onChange={(e) => handleChangeAttr(index, e.target.value)}
              disabled={pontosDisponiveis <= 0}
            />
            <Form.Text className="text-muted">{nome}</Form.Text>
          </Col>
        ))}
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={4}>
          <SubtituloFicha texto="Nível" />
          <Form.Select
            value={nivelSelecionado || ""}
            onChange={handleSelectNivel}
            className="mb-3"
            name="nivel"
          >
            {nivelList.map(({ id, titulo }) => (
              <option key={id} value={id}>
                {titulo}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={8} className="text-center">
          <SubtituloFicha texto="Pontos de Atribuição" />

          {erro && (
            <Alert variant="danger" className="mb-2">
              {erro}
            </Alert>
          )}

          <Row>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                name="pontos.disponiveis"
                value={pontosDisponiveis || 0}
                readOnly
                className={clsx({ "text-danger": pontosDisponiveis < 0 })}
              />
            </Col>

            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={pontosAtribTotal || 0}
                readOnly
                name="pontos.total"
              />
            </Col>
          </Row>

          <Button
            variant="outline-danger"
            onClick={handleResetAtributos}
            className="mt-3"
            aria-label="Resetar todos os atributos para zero"
          >
            Resetar Atributos
          </Button>
        </Col>
      </Row>
    </>
  );
}
