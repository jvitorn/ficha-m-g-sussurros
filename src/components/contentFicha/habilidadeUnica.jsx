"use client";
import { useState } from 'react';

export default function ContentFichaHabilidadesMagicas() {
  const [ptUso, setPtUso] = useState(0);
  const [ptTotais, setPtTotais] = useState(0);
  const [habilidadesList, setHabilidadesList] = useState([
    {
      id: 'CDF',
      titulo:'Canhão de Fogo',
      ptUso: 3,
      descricao:'O usuário dispara um canhão de fogo muito poderoso',
    },
    {
      titulo:'Cura',
      ptUso: 2,
      descricao:'O usuário cura um aliado',
    }
  ]);
  return (
    <>
      {/* Habilidades */}
      <div className="row mb-5">
        <div className="col-3">
          <label className="form-label">Pontos de Uso</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ex: 03"
            value={ptUso}
            onChange={(e) => setPtUso(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label">Pontos Totais</label>
          <input
            type="number"
            className="form-control"
            placeholder="10"
            disabled
            value={ptTotais}
            onChange={(e) => setPtTotais(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-9">
        <label className="form-label">Nome</label>
          <select className="form-select mb-3">
            {habilidadesList.map((habilidade,idx) => (
              <option key={idx+habilidade.id} value={habilidade.id}>{habilidade.titulo}</option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <label className="form-label">Custo</label>
          <input
            type="number"
            className="form-control"
            placeholder="10"
            disabled
            value={ptTotais}
            onChange={(e) => setPtTotais(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" rows="10" disabled></textarea>
        </div>

      </div>
    </>
  )
}
