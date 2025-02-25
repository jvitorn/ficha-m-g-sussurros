"use client";
import { useState } from 'react';

export default function ContentFichaMagiasUnicas() {
  const [nomeMagias,setNomeMagias] = useState('');
  const [descricao,setDescricao] = useState('');
  const [descricaoLv,setDescricaoLv] = useState('');
  return (
    <>
      {/* Nome e descrição da magia unica */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Nome</label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Ex: Canhão de Fogo"
            value={nomeMagias}
            onChange={(e) => setNomeMagias(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Descrição</label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Ex: O usuário dispara um canhão de fogo muito poderoso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Descrição por Level</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: +2"
            value={descricaoLv}
            onChange={(e) => setDescricaoLv(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
