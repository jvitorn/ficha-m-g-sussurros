"use client";

import { createContext, useState, useContext } from 'react';

// Cria o contexto
const AtributosContext = createContext();

// Provedor do contexto
export function AtributosProvider({ children }) {
  const [atributos, setAtributos] = useState([
    { nome: 'Agilidade', sigla: 'AGI', valor: 10 },
    { nome: 'Constituição Mágica', sigla: 'CM', valor: 0 },
    { nome: 'Inteligencia', sigla: 'INT', valor: 0 },
    { nome: 'Poder Mágico', sigla: 'POM', valor: 0 },
    { nome: 'Presença Mágica', sigla: 'PM', valor: 0 },
    { nome: 'Conexão Grimório', sigla: 'CG', valor: 0 },
  ]);

 // Função para atualizar um atributo
 const atualizarAtributo = (atributo, novoValor) => {
  console.log('[atualizarAtributo]', atributo, novoValor);
  setAtributos((prevAtributos) => 
    prevAtributos.map((attr) => {
      
      attr.sigla === atributo ? { ...attr, valor: novoValor } : attr
    })
  );
};

return (
  <AtributosContext.Provider value={{ atributos, atualizarAtributo }}>
    {children}
  </AtributosContext.Provider>
);
}

// Hook personalizado para usar o contexto
export function useAtributos() {
return useContext(AtributosContext);
}