// src/data/accordionItems.jsx
"use client";

import ContentFichaAtributos from "@/components/contentFicha/atributos";
import ContentFichaNome from "@/components/contentFicha/nome";
import ContentFichaManaHp from "@/components/contentFicha/manaHP";
import ContentFichaPericias from "@/components/contentFicha/pericias";
import ContentFichaClasse from "@/components/contentFicha/classe";
import ContentFichaMagiasUnicas from "@/components/contentFicha/magiasUnicas";
import ContentFichaHabilidadesMagicas from "@/components/contentFicha/habilidadeUnica";
import ContentFichaInspiracaoDefesa from "@/components/contentFicha/inspiracaoDefesa";

const accordionItemsFicha = [
  {
    title: "Nome do Personagem e Cor do Grimório",
    content: <ContentFichaNome />,
  },
  {
    title: "Atributos & Nivel *",
    content: <ContentFichaAtributos />,
  },
  {
    title: "Classe - Subclasses e Resistências",
    content: <ContentFichaClasse />,
  },
  {
    title: "Mana e HP",
    content: <ContentFichaManaHp />,
  },
  {
    title: "Perícias *",
    content: <ContentFichaPericias />,
  },
  {
    title: "Mágias Únicas",
    content: <ContentFichaMagiasUnicas />,
  },
  {
    title: "Habilidades Mágicas *",
    content: <ContentFichaHabilidadesMagicas />,
  },
  {
    title: "Inspiração e Defesa",
    content: <ContentFichaInspiracaoDefesa />,
  },
];

export default accordionItemsFicha;
