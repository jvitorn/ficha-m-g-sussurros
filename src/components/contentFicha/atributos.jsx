"use client";
import { useState } from 'react';
import { useAtributos } from '@/context/atributosContext';

export default function ContentFichaAtributos() {
  const { atributos, atualizarAtributo } = useAtributos();

  const [nivel, setNivel] = useState(1);
  const [pontosAtrib, setPontosAtrib] = useState(0);

  // Função corrigida para atualizar o contexto
  const handleChangeAttr = (index, newValue) => {
    const valorNumerico = Number(newValue);
    const atributoAlvo = atributos[index].sigla; // Pega a sigla do atributo
    
    // Atualiza o contexto usando a sigla como identificador
    atualizarAtributo(atributoAlvo, valorNumerico);
  };

  return (
    <>
      <div className="row mb-3">
        {atributos.map((atributo, index) => (
          <div className="col-md-2 col-6 mb-3" key={index}>
            <label className="form-label">{`${atributo.nome} (${atributo.sigla})`}</label>
            <input
              type="number"
              className="form-control"
              placeholder={atributo.sigla}
              value={atributo.valor}
              onChange={(e) => handleChangeAttr(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Linha Nível, Pontos de Atribuição */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Nível</label>
          <input
            type="number" // Alterado para number
            className="form-control"
            placeholder="Ex: 3"
            value={nivel}
            onChange={(e) => setNivel(Number(e.target.value))} // Convertendo para número
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Pontos de Atribuição</label>
          <input
            type="number" // Alterado para number
            className="form-control"
            placeholder="Ex: 5"
            value={pontosAtrib}
            onChange={(e) => setPontosAtrib(Number(e.target.value))} // Convertendo para número
          />
        </div>
      </div>
    </>
  );
}