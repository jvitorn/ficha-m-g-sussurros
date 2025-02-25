"use client";
import { useState } from 'react';

export default function ContentFichaManaHp() {
  const [mana, setMana] = useState(0);
  const [hp, setHp] = useState(0);
  return (
    <>
      {/* Mana & HP */}
      <div className="row mb-3">
        <div className="col-6 offset-4">
        <div className="col-md-4">
          <label className="form-label">Mana</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 10"
            value={mana}
            onChange={(e) => setMana(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">HP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 10"
            value={mana}
            onChange={(e) => setMana(e.target.value)}
          />
        </div>
        </div>
      </div>

    </>
  )
}
