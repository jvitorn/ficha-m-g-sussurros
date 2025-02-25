"use client";
import { useState } from 'react';

export default function ContentFichaNome() {
  const [nomePersonagem, setNomePersonagem] = useState('');

  const [corGrimorio, setCorGrimorio] = useState('');
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Personagem</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Personagem"
            value={nomePersonagem}
            onChange={(e) => setNomePersonagem(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Cor do Grimorio</label>
          <input
            type="text"
            className="form-control"
            placeholder="Cor do Grimorio"
            value={corGrimorio}
            onChange={(e) => setCorGrimorio(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
