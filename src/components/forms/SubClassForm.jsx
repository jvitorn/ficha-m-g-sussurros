"use client";

import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubclassSchema } from "@/lib/schemas/subclassSchema"; // Importe o schema da SubClasse
import { useEffect, useState } from "react";

const SubClassForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(SubclassSchema), // Use o schema da SubClasse
  });

  // Estado para armazenar a lista de classes
  const [classes, setClasses] = useState([]);

  // Simulação de busca das classes (substitua por uma chamada à API)
  useEffect(() => {
    // Exemplo de dados estáticos (substitua por uma chamada à API)
    const fetchClasses = async () => {
      const fakeClasses = [
        { id: "1", name: "Guerreiro" },
        { id: "2", name: "Mago" },
        { id: "3", name: "Arqueiro" },
      ];
      setClasses(fakeClasses);
    };

    fetchClasses();
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Nome */}
      <Form.Group className="mb-3">
        <Form.Label>Nome da SubClasse</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome da subclasse"
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

      {/* Select de Classe Pai */}
      <Form.Group className="mb-3">
        <Form.Label>Classe Pai</Form.Label>
        <Form.Select
          {...register("classId")}
          isInvalid={!!errors.classId}
        >
          <option value="">Selecione uma classe</option>
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.name}
            </option>
          ))}
        </Form.Select>
        {errors.classId && (
          <Form.Control.Feedback type="invalid">
            {errors.classId.message}
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

export default SubClassForm;