"use client";

import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassSchema } from "@/lib/schemas/classSchema";

const ClassForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ClassSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Nome */}
      <Form.Group className="mb-3">
        <Form.Label>Nome da Classe</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome da classe"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Campo Descrição */}
      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Digite uma descrição (opcional)"
          {...register("description")}
          isInvalid={!!errors.description}
        />
        {errors.description && (
          <Form.Control.Feedback type="invalid">
            {errors.description.message}
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

export default ClassForm;
