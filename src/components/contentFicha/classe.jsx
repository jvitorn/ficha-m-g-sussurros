"use client";
import { useState } from 'react';

export default function ContentFichaClasse() {
  const [raca, setRaca] = useState('');
  const [subclasses, setSubclasses] = useState('');
  const [resFisica, setResFisica] = useState('');
  return (
    <>
      {/* Raça, Subclasses, Resistências */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Raça</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: Elfo"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Subclasses</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: Guerreiro Arcano"
            value={subclasses}
            onChange={(e) => setSubclasses(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Resistência Física</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: +2"
            value={resFisica}
            onChange={(e) => setResFisica(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
