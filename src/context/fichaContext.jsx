"use client";
// Hooks do React
import { createContext, useState, useContext } from 'react';

// Cria o contexto de ficha
const FichaContext = createContext();

// Lista fixa de níveis com suas propriedades
const NIVEL_LIST = [
  { id: '01', titulo: 'Nivel 1', valor: 1, pontosAtribuicao: 20 },
  { id: '02', titulo: 'Nivel 2', valor: 2, pontosAtribuicao: 24 },
  { id: '03', titulo: 'Nivel 3', valor: 3, pontosAtribuicao: 28 },
  { id: '04', titulo: 'Nivel 4', valor: 4, pontosAtribuicao: 32 },
  { id: '05', titulo: 'Nivel 5', valor: 5, pontosAtribuicao: 36 },
  { id: '06', titulo: 'Nivel 6', valor: 6, pontosAtribuicao: 40 },
  { id: '07', titulo: 'Nivel 7', valor: 7, pontosAtribuicao: 44 },
  { id: '08', titulo: 'Nivel 8', valor: 8, pontosAtribuicao: 48 },
  { id: '09', titulo: 'Nivel 9', valor: 9, pontosAtribuicao: 52 },
  { id: '10', titulo: 'Nivel 10', valor: 10, pontosAtribuicao: 56 },
  { id: '11', titulo: 'Nivel 11', valor: 11, pontosAtribuicao: 60 },
  { id: '12', titulo: 'Nivel 12', valor: 12, pontosAtribuicao: 64 },
  { id: '13', titulo: 'Nivel 13', valor: 13, pontosAtribuicao: 68 },
  { id: '14', titulo: 'Nivel 14', valor: 14, pontosAtribuicao: 72 },
  { id: '15', titulo: 'Nivel 15', valor: 15, pontosAtribuicao: 76 },
  { id: '16', titulo: 'Nivel 16', valor: 16, pontosAtribuicao: 80 },
  { id: '17', titulo: 'Nivel 17', valor: 17, pontosAtribuicao: 84 },
  { id: '18', titulo: 'Nivel 18', valor: 18, pontosAtribuicao: 88 },
  { id: '19', titulo: 'Nivel 19', valor: 19, pontosAtribuicao: 92 },
  { id: '20', titulo: 'Nivel 20', valor: 20, pontosAtribuicao: 96 },
];

// Provedor do contexto (wrapper para a árvore de componentes)
export function FichaProvider({ children }) {
  // Estado inicial dos atributos do personagem
  const [atributos, setAtributos] = useState([
    { nome: 'Agilidade', sigla: 'AGI', valor: 0 },
    { nome: 'Constituição Mágica', sigla: 'CM', valor: 0 },
    { nome: 'Inteligência', sigla: 'INT', valor: 0 },
    { nome: 'Poder Mágico', sigla: 'POM', valor: 0 },
    { nome: 'Presença Mágica', sigla: 'PM', valor: 0 },
    { nome: 'Conexão Grimório', sigla: 'CG', valor: 0 },
  ]);

  // ---------------------------------------------------------------
  // FUNÇÕES DO CONTEXTO
  // ---------------------------------------------------------------

  /**
   * Atualiza o valor de um atributo específico
   * @param {string} atributo - Sigla do atributo a ser atualizado (ex: 'AGI')
   * @param {number} novoValor - Novo valor do atributo
   */
  const atualizarAtributo = (atributo, novoValor) => {
    setAtributos((prevAtributos) =>
      prevAtributos.map((attr) =>
        attr.sigla === atributo ? { ...attr, valor: novoValor } : attr
      )
    );
  };

  /**
   * Reseta todos os atributos para seus valores iniciais
   * - AGI volta para 10
   * - Demais atributos voltam para 0
   */
  const resetAtributos = () => {
    setAtributos([
      { nome: 'Agilidade', sigla: 'AGI', valor: 0 },
      { nome: 'Constituição Mágica', sigla: 'CM', valor: 0 },
      { nome: 'Inteligência', sigla: 'INT', valor: 0 },
      { nome: 'Poder Mágico', sigla: 'POM', valor: 0 },
      { nome: 'Presença Mágica', sigla: 'PM', valor: 0 },
      { nome: 'Conexão Grimório', sigla: 'CG', valor: 0 },
    ]);
  };

  // ---------------------------------------------------------------
  // VALORES EXPOSTOS PELO CONTEXTO
  // ---------------------------------------------------------------
  
  return (
    <FichaContext.Provider 
      value={{ 
        atributos,          // Lista de atributos
        atualizarAtributo,  // Função para atualizar um atributo
        resetAtributos,     // Função para resetar todos os atributos
        NIVEL_LIST          // Lista de níveis disponíveis
      }}
    >
      {children}
    </FichaContext.Provider>
  );
}

// ---------------------------------------------------------------
// HOOK PERSONALIZADO PARA USAR O CONTEXTO
// ---------------------------------------------------------------

/**
 * Hook personalizado para acessar o contexto de ficha
 * @returns {Object} - Retorna o contexto com atributos e funções
 */
export function useAtributos() {
  const context = useContext(FichaContext);
  
  // Verifica se o hook está sendo usado dentro do FichaProvider
  if (!context) {
    throw new Error('useAtributos deve ser usado dentro de um FichaProvider');
  }
  
  return context;
}