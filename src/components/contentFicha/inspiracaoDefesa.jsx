"use client";
import { useState } from 'react';

export default function ContentFichaInspiracaoDefesa() {
  const [inspiracao, setInspiracao] = useState(0);
  const [inspiracaoTotal, setInspiracaoTotal] = useState(3);
  return (
    <>
      {/* Raça, Subclasses, Resistências */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Inspiração</label>
          <input
            type="number"
            className="form-control"
            placeholder="01"
            value={inspiracao}
            onChange={(e) => setInspiracao(e.target.value)}
          />
           <input
            type="number"
            className="form-control"
            placeholder="01"
            value={inspiracaoTotal}
            disabled
            onChange={(e) => setInspiracao(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
