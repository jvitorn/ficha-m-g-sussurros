"use client";
import { useState, useEffect } from 'react';

import { useAtributos } from '@/context/atributosContext';

export default function ContentFichaPericias() {
  const { atributos } = useAtributos();
  // useEffect para atualizar os valores das perícias quando os atributos mudam
  useEffect(() => {
    console.log('bateu no effect')
    const novasPericias = pericias.map((pericia) => {
      console.log('[Pericia]',pericia)
      if (pericia.ativo) {
        console.log('[Pericia ativo]',pericia)
        const atributoCorrespondente = atributos.find((attr) => attr.sigla === pericia.atributo);
        console.log('[atributoCorrespondente]', atributoCorrespondente)
        if (atributoCorrespondente) {
          return { ...pericia, valor: atributoCorrespondente.value };
        }
      }
      return pericia;
    });

    setPericias(novasPericias);
  }, [atributos]); // Executa sempre que os atributos mudam

  // Exemplo de estado para as perícias (cada perícia tem atributos distintos)
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
  ])
  // Função para atualizar uma perícia específica
  const handleChangePericia = (index, campo, valor) => {
    const lista = [...pericias]
    lista[index][campo] = valor
    setPericias(lista)
  }
  // Função para lidar com a mudança do checkbox
  const handleCheckboxChange = (index) => {
    const pericia = pericias[index];
    const novoEstado = !pericia.ativo; // Inverte o estado do checkbox
    // Atualiza o estado do checkbox
    handleChangePericia(index, 'ativo', novoEstado);

    // Se o checkbox estiver ativo, busca o valor do atributo correspondente
    if (novoEstado) {
      const atributoCorrespondente = atributos.find((attr) => attr.sigla === pericia.atributo);
      console.log('[atributoCorrespondente]', atributoCorrespondente)
      if (atributoCorrespondente) {
        handleChangePericia(index, 'valor', atributoCorrespondente.valor);
      }
    } else {
      // Se o checkbox estiver desativado, reseta o valor da perícia
      handleChangePericia(index, 'valor', 0);
    }
  };

  return (
    <>
      {/* Mana & HP */}
      <div className="row mb-3">
        {/* Seção de Perícias */}
        <h4 className="mt-4 mb-2">Perícias</h4>
        <table className="table table-striped table-bordered">
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
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="+0"
                    value={per.bonus}
                    onChange={(e) => handleChangePericia(index, 'bonus', e.target.value)}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={per.ativo}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}
