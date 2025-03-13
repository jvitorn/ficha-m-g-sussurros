"use client";
import { useState, useEffect } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { useFicha } from '@/context/fichaContext';

export default function ContentFichaPericias() {
  const { atributos } = useFicha();

  const [pericias, setPericias] = useState([
    { nome: 'Arcana', atributo: 'PM', bonus: '', valor: 0, ativo: false },
    { nome: 'Atletismo', atributo: 'FOR', bonus: '', valor: 0, ativo: false },
    { nome: 'Domínio Animal', atributo: 'PM', bonus: '', valor: 0, ativo: false },
    { nome: 'Elementalista', atributo: 'PM', bonus: '', valor: 0, ativo: false },
    { nome: 'Furtividade', atributo: 'AGI', bonus: '', valor: 0, ativo: false },
    { nome: 'Intimidação', atributo: 'FOR', bonus: '', valor: 0, ativo: false },
    { nome: 'Investigação', atributo: 'INT', bonus: '', valor: 0, ativo: false },
    { nome: 'Mecânica', atributo: 'INT', bonus: '', valor: 0, ativo: false },
    { nome: 'Medicina', atributo: 'INT', bonus: '', valor: 0, ativo: false },
    { nome: 'Memória', atributo: 'INT', bonus: '', valor: 0, ativo: false },
    { nome: 'Persuasão', atributo: 'CAR', bonus: '', valor: 0, ativo: false },
    { nome: 'Percepção', atributo: 'INT', bonus: '', valor: 0, ativo: false },
    { nome: 'Punição', atributo: 'CM', bonus: '', valor: 0, ativo: false },
    { nome: 'Sobrevivência', atributo: 'INT', bonus: '', valor: 0, ativo: false },
  ]);

  // Atualiza as perícias sempre que os atributos mudam
  useEffect(() => {
    const novasPericias = pericias.map((pericia) => {
      if (pericia.ativo) {
        const atributoCorrespondente = atributos.find((attr) => attr.sigla === pericia.atributo);
        if (atributoCorrespondente) {
          // Calcula o bônus como metade do valor do atributo (arredondado para baixo)
          return { ...pericia, valor: Math.floor(atributoCorrespondente.valor / 2) };
        }
      }
      return pericia;
    });
    setPericias(novasPericias);
  }, [atributos]);

  const handleChangePericia = (index, campo, valor) => {
    const lista = [...pericias];
    lista[index][campo] = valor;
    setPericias(lista);
  };

  const handleCheckboxChange = (index, isAtivo) => {
    const pericia = pericias[index];
    const novoEstado = !isAtivo;
    handleChangePericia(index, 'ativo', novoEstado);

    if (novoEstado) {
      const atributoCorrespondente = atributos.find((attr) => attr.sigla === pericia.atributo);
      if (atributoCorrespondente) {
        handleChangePericia(index, 'valor', Number(atributoCorrespondente.valor));
      }
    } else {
      handleChangePericia(index, 'valor', 0);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <h4 className="mt-4 mb-2">Perícias</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Perícia</th>
              <th style={{ width: '25%' }}>Atributo</th>
              <th style={{ width: '25%' }}>Bônus</th>
              <th style={{ width: '25%' }}>Ativo</th>
            </tr>
          </thead>
          <tbody>
            {pericias.map((per, index) => (
              <tr key={index}>
                <td>{per.nome}</td>
                <td>{per.atributo}</td>
                <td>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="+0"
                    value={per.valor}
                    readOnly
                  />
                </td>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={per.ativo}
                    onChange={() => handleCheckboxChange(index, per.ativo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}