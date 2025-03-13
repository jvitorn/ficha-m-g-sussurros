"use client";

// import "@/app/styles/global.css";
// layout.js
// import '@/app/styles/darkTheme.css';

import Head from "next/head";
import { Container, Button } from "react-bootstrap";
import { FichaProvider, useFicha } from "@/context/fichaContext";
import DynamicAccordion from "@/components/DynamicAccordion";
import accordionItemsFicha from "@/data/accordionItems";

import ThemeSwitcher from "@/components/ThemeSwitcher";

// Componente interno que usa o contexto
function ConteudoFicha() {
  const { nomePersonagem } = useFicha();

  // Variáveis de exemplo
  const corPersonagem = "Azul";
  const mana = 100;
  const nivel = 1;
  const pontosAtrib = 0;
  const magiaNome = "";
  const magiaEfeito = "";
  const raca = "";
  const subclasses = "";
  const resFisica = "";
  const resMagica = "";
  const pericias = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados da ficha:", {
      nomePersonagem,
      corPersonagem,
      mana,
      nivel,
      pontosAtrib,
      magiaNome,
      magiaEfeito,
      raca,
      subclasses,
      resFisica,
      resMagica,
      pericias,
    });
    alert("Ficha atualizada com sucesso!");
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3 text-capitalize text-center">{`${
        nomePersonagem ? nomePersonagem : "Ficha do personagem"
      } | Sussurros do Dragão`}</h2>
      <form onSubmit={handleSubmit}>
        <DynamicAccordion items={accordionItemsFicha} />
      </form>
    </Container>
  );
}

// Componente principal que envolve com o Provider
export default function FichaRPG() {
  return (
    <>
      <Head>
        <title>Ficha Sussurros do Dragão</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FichaProvider>
        {/* ... outros componentes */}
        <ThemeSwitcher />
        <ConteudoFicha />
      </FichaProvider>
    </>
  );
}
