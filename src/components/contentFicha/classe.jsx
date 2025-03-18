"use client";
import { Row, Col, Form } from "react-bootstrap";
import { useFicha } from "@/contexts/fichaContext";
import SubtituloFicha from "@/components/subtituloFicha";
import { Controller, useFormContext } from "react-hook-form";

export default function ContentFichaClasse() {
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

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleSelectRaca = (e) => {
    const raca = racaList.find((r) => r.id == e.target.value);
    setRacaSelecionada(raca || null);
  };

  const handleSelectClasse = (e) => {
    const id = parseInt(e.target.value);
    const classe = classeList.find((c) => c.id === id);
    setClasseSelecionada(classe || null);
  };

  const handleSelectSubClasse = (e) => {
    const subclasse = subclasseList.find((s) => s.id == e.target.value);
    setSubclasseSelecionada(subclasse || null);
  };

  return (
    <>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12} md={12}>
              <SubtituloFicha texto="Raça" />
              <Controller
                name="race"
                control={control}
                rules={{ required: "Raça é obrigatória." }}
                render={({ field }) => (
                  <Form.Select
                    value={racaSelecionada?.id || ""}
                    onChange={(e) => {
                      handleSelectRaca(e);
                      field.onChange(e);
                    }}
                    isInvalid={!!errors.race}
                  >
                    <option value="">Selecione uma Raça</option>
                    {racaList.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.race && (
                <p className="text-danger">{errors.race.message}</p>
              )}

              <SubtituloFicha texto="Caracteristicas da Raça" />
              <Form.Label>Habilidade</Form.Label>
              <Form.Control
                type="text"
                value={racaSelecionada?.habilidade || ""}
                readOnly
                name="race.hability"
              />
              <Form.Label>Descrição Geral</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={racaSelecionada?.description || ""}
                readOnly
                name="race.description"
              />
              <Row>
                <Col md={6}>
                  <Form.Label>Vantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.advantages || ""}
                    readOnly
                    name="race.advantages"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Desvantagens</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={racaSelecionada?.disadvantages || ""}
                    readOnly
                    name="race.disadvantages"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={6}>
          <SubtituloFicha texto="Classe" />
          <Controller
            name="characterClass"
            control={control}
            rules={{ required: "Classe é obrigatória." }}
            render={({ field }) => (
              <Form.Select
                value={classeSelecionada?.id || ""}
                onChange={(e) => {
                  handleSelectClasse(e);
                  field.onChange(e);
                }}
                isInvalid={!!errors.characterClass}
              >
                <option value="">Selecione uma Classe</option>
                {classeList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          {errors.characterClass && (
            <p className="text-danger">{errors.characterClass.message}</p>
          )}

          <SubtituloFicha texto="SubClasse" />
          <Controller
            name="subclass"
            control={control}
            rules={{ required: "SubClasse é obrigatória." }}
            render={({ field }) => (
              <Form.Select
                value={subclasseSelecionada?.id || ""}
                onChange={(e) => {
                  handleSelectSubClasse(e);
                  field.onChange(e);
                }}
                isInvalid={!!errors.subclass}
              >
                <option value="">Selecione uma Sub Classe</option>
                {subclasseList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          {errors.subclass && (
            <p className="text-danger">{errors.subclass.message}</p>
          )}

          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={subclasseSelecionada?.description || ""}
            readOnly
            name="subclass.description"
          />
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>Vantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.advantages || ""}
                readOnly
                name="subclass.advantages"
              />
            </Col>
            <Col md={6}>
              <Form.Label>Desvantagens</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={subclasseSelecionada?.disadvantages || ""}
                readOnly
                name="subclass.disadvantages"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
