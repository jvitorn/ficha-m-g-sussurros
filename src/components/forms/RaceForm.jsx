"use client";

import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RaceSchema } from "@/lib/schemas/raceSchema"; // Importe o schema da Raça

/**
 * Componente de formulário para criar/editar uma Raça.
 *
 * O formulário tem campos para:
 * - Nome da Raça
 * - História (opcional)
 * - Vantagens (opcional)
 * - Desvantagens (opcional)
 *
 * O componente recebe dois parâmetros:
 * - `onSubmit`: Função chamada quando o formulário é submetido com sucesso.
 *   Ela recebe como parâmetro o objeto com os dados da Raça.
 * - `onCancel`: Função chamada quando o usuário clica no botão "Cancelar".
 *
 * O componente renderiza um formulário com os campos mencionados acima e dois
 * botões: "Cancelar" e "Salvar".
 */
const RaceForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RaceSchema), // Use o schema da Raça
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Nome */}
      <Form.Group className="mb-3">
        <Form.Label>Nome da Raça</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome da raça"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Campo História */}
      <Form.Group className="mb-3">
        <Form.Label>História</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Digite a história da raça (opcional)"
          {...register("history")}
          isInvalid={!!errors.history}
        />
        {errors.history && (
          <Form.Control.Feedback type="invalid">
            {errors.history.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Campo Vantagens (opcional) */}
      <Form.Group className="mb-3">
        <Form.Label>Vantagens</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Digite as vantagens da raça (opcional)"
          {...register("advantages")}
          isInvalid={!!errors.advantages}
        />
        {errors.advantages && (
          <Form.Control.Feedback type="invalid">
            {errors.advantages.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Campo Desvantagens (opcional) */}
      <Form.Group className="mb-3">
        <Form.Label>Desvantagens</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Digite as desvantagens da raça (opcional)"
          {...register("disadvantages")}
          isInvalid={!!errors.disadvantages}
        />
        {errors.disadvantages && (
          <Form.Control.Feedback type="invalid">
            {errors.disadvantages.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Botões */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </Form>
  );
};

export default RaceForm;
