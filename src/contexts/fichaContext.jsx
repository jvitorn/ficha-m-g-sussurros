"use client";
// Importa os hooks do React
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

// Cria o contexto de ficha
const FichaContext = createContext();

// Lista fixa de níveis com suas propriedades
// const nivelList = [
//   { id: 1, titulo: "Nivel 1", valor: 1, pontosAtribuicao: 20 },
//   { id: 2, titulo: "Nivel 2", valor: 2, pontosAtribuicao: 24 },
//   { id: 3, titulo: "Nivel 3", valor: 3, pontosAtribuicao: 28 },
//   { id: 4, titulo: "Nivel 4", valor: 4, pontosAtribuicao: 32 },
//   { id: 5, titulo: "Nivel 5", valor: 5, pontosAtribuicao: 36 },
//   { id: 6, titulo: "Nivel 6", valor: 6, pontosAtribuicao: 40 },
//   { id: 7, titulo: "Nivel 7", valor: 7, pontosAtribuicao: 44 },
//   { id: 8, titulo: "Nivel 8", valor: 8, pontosAtribuicao: 48 },
//   { id: 9, titulo: "Nivel 9", valor: 9, pontosAtribuicao: 52 },
//   { id: 10, titulo: "Nivel 10", valor: 10, pontosAtribuicao: 56 },
//   { id: 11, titulo: "Nivel 11", valor: 11, pontosAtribuicao: 60 },
//   { id: 12, titulo: "Nivel 12", valor: 12, pontosAtribuicao: 64 },
//   { id: 13, titulo: "Nivel 13", valor: 13, pontosAtribuicao: 68 },
//   { id: 14, titulo: "Nivel 14", valor: 14, pontosAtribuicao: 72 },
//   { id: 15, titulo: "Nivel 15", valor: 15, pontosAtribuicao: 76 },
//   { id: 16, titulo: "Nivel 16", valor: 16, pontosAtribuicao: 80 },
//   { id: 17, titulo: "Nivel 17", valor: 17, pontosAtribuicao: 84 },
//   { id: 18, titulo: "Nivel 18", valor: 18, pontosAtribuicao: 88 },
//   { id: 19, titulo: "Nivel 19", valor: 19, pontosAtribuicao: 92 },
//   { id: 20, titulo: "Nivel 20", valor: 20, pontosAtribuicao: 96 },
// ];
// Lista fixa de raças e suas propriedades
const racaList = [
  {
    id: 1,
    nome: "Humano",
    habilidade: "ser humano",
    descricao: "aqui é a raça humana",
    vantagens: "sem vantagem",
    desvantagens: "Vida normal, sem buff",
  },
  {
    id: 2,
    nome: "Elfo",
    habilidade: "Libelula",
    descricao: "Aqui sao os elfos",
    vantagens: "muita mana",
    desvantagens: "Pouca vida",
  },
  { id: 3, nome: "Lumis" },
  { id: 4, nome: "Ignar" },
  { id: 5, nome: "Floresto" },
  { id: 6, nome: "Nebulari" },
  { id: 7, nome: "Draconiano" },
  { id: 8, nome: "Espectral" },
];
// Lista fixa de classes
const classeList = [
  {
    id: 1,
    nome: "Suporte",
    formulas: [
      {
        name: "HP",
        estrutura: "10 + (CM x 2) + Nivel x 6", // estrutura da formula
        atributos: ["CM"], // Apenas atributos do array atributos
        usaNivel: true, // Flag para incluir o nível
      },
      {
        name: "MP",
        estrutura: "(Nivel x 3) + (POM x 2) + (CG x 2)",
        atributos: ["POM", "CG"], // Apenas atributos do array atributos
        usaNivel: true,
      },
      {
        name: "DEF",
        estrutura: "CM / 3",
        atributos: ["CM"], // Apenas atributos do array atributos
        usaNivel: false,
      },
    ],
  },
  {
    id: 2,
    nome: "Longo",
    formulas: [
      {
        name: "HP",
        estrutura: "10 + (CM x 2) + Nivel x 6", // estrutura da formula
        atributos: ["CM"], // Apenas atributos do array atributos
        usaNivel: true, // Flag para incluir o nível
      },
      {
        name: "MP",
        estrutura: "CG * 2",
        atributos: ["CG"], // Apenas atributos do array atributos
        usaNivel: false,
      },
    ],
  },
  {
    id: 3,
    nome: "Criação",
    formulas: [
      {
        name: "HP",
        estrutura: "10 + (CM x 2) + Nivel x 6", // estrutura da formula
        atributos: ["CM"], // Apenas atributos do array atributos
        usaNivel: true, // Flag para incluir o nível
      },
      {
        name: "MP",
        estrutura: "CG * 2",
        atributos: ["CG"], // Apenas atributos do array atributos
        usaNivel: false,
      },
    ],
  },
  { id: 4, nome: "Corpo a Corpo" },
  { id: 5, nome: "Especialista" },
];
const subclasseList = [
  {
    id: 1,
    nome: "Mestre das Maldições",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em lançar maldições e debuffs nos inimigos, enfraquecendo-os e tornando-os mais vulneráveis",
    vantagens: "facilidade em criar magias de controle",
    desvantagens: "pouca vida",
  },
  {
    id: 2,
    nome: "Ritualista Místico",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em realizar rituais mágicos que podem alterar o curso de uma batalha.",
    vantagens: "facilidade em criar magias com debuff",
    desvantagens: "pouca vida",
  },
  {
    id: 3,
    nome: "Mestre da Cura",
    classe: { id: 1, nome: "Suporte" },
    descricao:
      "Especialista em curar feridas e restaurar a mana dos aliados, com feitiços poderosos de regeneração.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 4,
    nome: "Lutador Mágico",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Combina habilidades de combate corpo a corpo com feitiços que aumentam sua força e resistência durante o combate",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 5,
    nome: "Mestre das Armaduras",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Especialista em conjurar armaduras mágicas que oferecem defesas únicas e poderosas, tornando-o um verdadeiro tanque em batalha.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 6,
    nome: "Assassino Mágico",
    classe: { id: 2, nome: "Corpo a Corpo" },
    descricao:
      "Combina agilidade e precisão com feitiços letais, capaz de infligir danos devastadores em curtos períodos de tempo.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 7,
    nome: "Arqueiro Mágico",
    classe: { id: 3, nome: "Longo Alcance" },
    descricao:
      "Especialista em lançar projéteis mágicos com alta precisão, causando danos significativos aos inimigos à distância.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
  {
    id: 7,
    nome: "Necromante",
    classe: { id: 3, nome: "Longo Alcance" },
    descricao:
      "Especialista em manipular as forças da vida e da morte, utilizando magias sombrias para drenar a vitalidade dos inimigos e alterar o curso da batalha a seu favor.",
    vantagens: "facilidade em criar de cura e mana",
    desvantagens: "pouca vida",
  },
];
// ----------------------------------------------------------------
// FUNÇÕES DE CÁLCULO DE ATRIBUTOS
// ----------------------------------------------------------------

/**
 * Função principal que calcula a fórmula a partir de uma string e dos atributos fornecidos.
 * @param {string} formula - Estrutura da fórmula (ex: "10 + (CM x 2) + Nivel x 6")
 * @param {Object} atributosCalculados - Objeto com os valores dos atributos necessários (ex: { CM: 5, Nivel: 3 })
 * @returns {number|null} Resultado numérico do cálculo ou null em caso de erro
 */
const calcularFormula = (formula, atributosCalculados) => {
  /**
   * Função para normalizar a expressão da fórmula.
   * Substitui a letra "x" (usada para multiplicação) pelo operador "*" do JavaScript.
   * Exemplo: "10 + (CM x 2) + Nivel x 6" se torna "10 + (CM * 2) + Nivel * 6"
   * @param {string} expression - Expressão da fórmula
   * @returns {string} Expressão normalizada
   */
  const normalizeExpression = (expression) => {
    return expression
      .replace(/(\d)\s*x\s*(\d)/gi, "$1*$2")
      .replace(/(\w)\s*x\s*(\d)/gi, "$1*$2")
      .replace(/(\d)\s*x\s*(\w)/gi, "$1*$2")
      .replace(/\s*x\s*/gi, " * ");
  };

  /**
   * Função para substituir os identificadores das variáveis na expressão pelos seus valores reais.
   * Exemplo: substitui "CM" e "Nivel" pelos valores correspondentes do objeto de atributos.
   * @param {string} expression - Expressão da fórmula normalizada
   * @param {Object} variables - Objeto com os valores dos atributos (ex: { CM: 5, Nivel: 3 })
   * @returns {string} Expressão com as variáveis substituídas pelos seus valores
   */
  const substituteVariables = (expression, variables) => {
    return Object.keys(variables).reduce((acc, key) => {
      const regex = new RegExp(`\\b${key}\\b`, "g");
      return acc.replace(regex, variables[key]);
    }, expression);
  };

  try {
    // Normaliza a expressão para garantir que o operador de multiplicação seja compatível
    const normalized = normalizeExpression(formula);
    // Substitui os identificadores das variáveis pelos seus valores reais
    const substituted = substituteVariables(normalized, atributosCalculados);
    // armazena o resultado
    const resultado = new Function(`return ${substituted}`)();
    // Arredonda para baixo e verifica se é número válido
    return typeof resultado === "number" ? Math.floor(resultado) : 0;
  } catch (error) {
    console.error("Erro ao avaliar a fórmula:", error);
    return null;
  }
};

// ----------------------------------------------------------------
// PROVEDOR DO CONTEXTO FICHA
// ----------------------------------------------------------------

/**
 * Provedor do contexto que disponibiliza os atributos, funções e lista de níveis
 * para os componentes filhos.
 */
export function FichaProvider({ children }) {
  // Dados enviados via APIs
  //  const [nivelList, setNivelList] = useState([]);
  const [nivelList, setNivelList] = useState([
    { id: 1, titulo: "Nivel 1", valor: 1, pontosAtribuicao: 20 },
    { id: 2, titulo: "Nivel 2", valor: 2, pontosAtribuicao: 24 },
    { id: 3, titulo: "Nivel 3", valor: 3, pontosAtribuicao: 28 },
    { id: 4, titulo: "Nivel 4", valor: 4, pontosAtribuicao: 32 },
    { id: 5, titulo: "Nivel 5", valor: 5, pontosAtribuicao: 36 },
    { id: 6, titulo: "Nivel 6", valor: 6, pontosAtribuicao: 40 },
    { id: 7, titulo: "Nivel 7", valor: 7, pontosAtribuicao: 44 },
    { id: 8, titulo: "Nivel 8", valor: 8, pontosAtribuicao: 48 },
    { id: 9, titulo: "Nivel 9", valor: 9, pontosAtribuicao: 52 },
    { id: 10, titulo: "Nivel 10", valor: 10, pontosAtribuicao: 56 },
    { id: 11, titulo: "Nivel 11", valor: 11, pontosAtribuicao: 60 },
    { id: 12, titulo: "Nivel 12", valor: 12, pontosAtribuicao: 64 },
    { id: 13, titulo: "Nivel 13", valor: 13, pontosAtribuicao: 68 },
    { id: 14, titulo: "Nivel 14", valor: 14, pontosAtribuicao: 72 },
    { id: 15, titulo: "Nivel 15", valor: 15, pontosAtribuicao: 76 },
    { id: 16, titulo: "Nivel 16", valor: 16, pontosAtribuicao: 80 },
    { id: 17, titulo: "Nivel 17", valor: 17, pontosAtribuicao: 84 },
    { id: 18, titulo: "Nivel 18", valor: 18, pontosAtribuicao: 88 },
    { id: 19, titulo: "Nivel 19", valor: 19, pontosAtribuicao: 92 },
    { id: 20, titulo: "Nivel 20", valor: 20, pontosAtribuicao: 96 },
  ]);
  const [racaList, setRacaList] = useState([]);
  const [classeList, setClasseList] = useState([]);
  const [subclasseList, setsubclasseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado inicial dos atributos do personagem
  const [atributos, setAtributos] = useState([
    { nome: "Agilidade", sigla: "AGI", valor: 0 },
    { nome: "Constituição Mágica", sigla: "CM", valor: 0 },
    { nome: "Inteligência", sigla: "INT", valor: 0 },
    { nome: "Poder Mágico", sigla: "POM", valor: 0 },
    { nome: "Presença Mágica", sigla: "PM", valor: 0 },
    { nome: "Conexão Grimório", sigla: "CG", valor: 0 },
  ]);
  // nomes
  const [nomePersonagem, setNomePersonagem] = useState(null);
  // Estados para armazenar os objetos completos
  const [classeSelecionada, setClasseSelecionada] = useState(null);
  const [subclasseSelecionada, setSubclasseSelecionada] = useState(null);
  const [racaSelecionada, setRacaSelecionada] = useState(null);
  // Nivel
  const [nivelSelecionado, setNivelSelecionado] = useState(nivelList[0].id); // ID do nível atual

  // Buscar dados da API
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch("/api/sheets");
        const data = await response.json();

        if (data.success) {
          if (data.levels) setNivelList(data.levels);
          setRacaList(data.races);
          setClasseList(data.classes);
          setsubclasseList(data.subclasses);
        } else {
          throw new Error("Falha ao carregar dados");
        }
      } catch (err) {
        setError(err.message);
        // Considerar fallback para dados locais se necessário
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  // ----------------------------------------------------------------
  // FUNÇÕES DO CONTEXTO
  // ----------------------------------------------------------------

  /**
   * Atualiza o valor de um atributo específico.
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
   * Reseta todos os atributos para seus valores iniciais.
   * Exemplo: 'Agilidade' volta para 0, 'Constituição Mágica' volta para 0, etc.
   */
  const resetAtributos = () => {
    setAtributos([
      { nome: "Agilidade", sigla: "AGI", valor: 0 },
      { nome: "Constituição Mágica", sigla: "CM", valor: 0 },
      { nome: "Inteligência", sigla: "INT", valor: 0 },
      { nome: "Poder Mágico", sigla: "POM", valor: 0 },
      { nome: "Presença Mágica", sigla: "PM", valor: 0 },
      { nome: "Conexão Grimório", sigla: "CG", valor: 0 },
    ]);
  };

  const calcularFormulaClasse = useCallback(
    (formula) => {
      const atributosObj = atributos.reduce(
        (acc, attr) => ({ ...acc, [attr.sigla]: attr.valor }),
        {}
      );
      const nivel =
        nivelList.find((n) => n.id === nivelSelecionado)?.valor || 0;

      const params = {
        ...formula.atributos.reduce(
          (acc, sigla) => ({ ...acc, [sigla]: atributosObj[sigla] || 0 }),
          {}
        ),
        ...(formula.usaNivel && { Nivel: nivel }),
      };

      return calcularFormula(formula.estrutura, params);
    },
    [atributos, nivelSelecionado]
  ); // Dependências do useCallback

  const hpTotal = useMemo(() => {
    if (!classeSelecionada?.receipt) return 0;
    const formulaHP = classeSelecionada.receipt.find((f) => f.name === "HP");
    return formulaHP ? calcularFormulaClasse(formulaHP) : 0;
  }, [atributos, nivelSelecionado, classeSelecionada]);

  const manaTotal = useMemo(() => {
    if (!classeSelecionada?.receipt) return 0;
    const formulaMana = classeSelecionada.receipt.find((f) => f.name === "MP");
    return formulaMana ? calcularFormulaClasse(formulaMana) : 0;
  }, [atributos, nivelSelecionado, classeSelecionada]);

  const defesaPassiva = useMemo(() => {
    if (!classeSelecionada?.receipt) return 0;
    const formulaDef = classeSelecionada.receipt.find((f) => f.name === "DEF");
    return formulaDef ? calcularFormulaClasse(formulaDef) : 0;
  }, [atributos, nivelSelecionado, classeSelecionada]);
  // ---------------------------------------------------
  // ----------------------------------------------------------------
  // VALORES EXPOSTOS PELO CONTEXTO
  // ----------------------------------------------------------------

  return (
    <FichaContext.Provider
      value={{
        atributos, // Lista de atributos do personagem
        atualizarAtributo, // Função para atualizar um atributo específico
        resetAtributos, // Função para resetar os atributos para o estado inicial
        nivelList, // Lista fixa de níveis disponíveis
        racaList, // lista fixa de Raças
        classeList, // Lista fixa de Classes
        subclasseList, // Lista fixa de Sub Classes
        calcularFormulaClasse,
        classeSelecionada,
        setClasseSelecionada,
        subclasseSelecionada,
        setSubclasseSelecionada,
        racaSelecionada,
        setRacaSelecionada,
        nivelSelecionado,
        setNivelSelecionado,
        hpTotal,
        manaTotal,
        defesaPassiva,
        nomePersonagem,
        setNomePersonagem,
      }}
    >
      {children}
    </FichaContext.Provider>
  );
}

// ----------------------------------------------------------------
// HOOK PERSONALIZADO PARA USAR O CONTEXTO
// ----------------------------------------------------------------

/**
 * Hook personalizado para acessar o contexto de ficha.
 * @returns {Object} - Retorna o contexto com atributos e funções para manipulação dos atributos e cálculo de fórmulas.
 */
export function useFicha() {
  const context = useContext(FichaContext);

  // Verifica se o hook está sendo usado dentro do FichaProvider
  if (!context) {
    throw new Error("useFicha deve ser usado dentro de um FichaProvider");
  }

  return context;
}
