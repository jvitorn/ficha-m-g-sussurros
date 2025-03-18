"use client";
import { Form, Row, Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import SubtituloFicha from "../subtituloFicha";

export default function ContentFichaNome() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formCharacterName">
            <SubtituloFicha texto="Nome do Personagem" />
            <Form.Control
              type="text"
              placeholder="Nome do Personagem"
              {...register("characterName", {
                required: "O nome do personagem é obrigatório.",
              })}
            />
            {errors.characterName && (
              <p className="text-danger">{errors.characterName.message}</p>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBookColor">
            <SubtituloFicha texto="Cor do Grimório" />
            <Form.Control
              type="text"
              placeholder="Cor do Grimório"
              {...register("bookColor", {
                required: "A cor do grimório é obrigatória.",
              })}
            />
            {errors.grimorioColor && (
              <p className="text-danger">{errors.grimorioColor.message}</p>
            )}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
