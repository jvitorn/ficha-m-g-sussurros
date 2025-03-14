"use client";

import Head from "next/head";
import { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { FichaProvider, useFicha } from "@/context/fichaContext";
import DynamicAccordion from "@/components/DynamicAccordion";
import accordionItemsFicha from "@/data/accordionItems";

import ThemeSwitcher from "@/components/ThemeSwitcher";

// Componente interno que usa o contexto
function ConteudoFicha() {
  const { nomePersonagem } = useFicha();
  const formRef = useRef(null);
  const pericias = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Captura todos os dados do formulário
    const formData = new FormData(formRef.current);
    console.log('formData',formData)
    const data = Object.fromEntries(formData.entries());
    console.log('data',data)
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro no servidor");
      
      alert("Ficha salva com sucesso!");
      console.log("Dados enviados:", data);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3 text-capitalize text-center">{`${
        nomePersonagem ? nomePersonagem : "Ficha do personagem"
      } | Sussurros do Dragão`}</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <DynamicAccordion items={accordionItemsFicha} />
        <div className="text-center mt-4">
            <Button variant="primary" type="submit" size="lg">
              Salvar Personagem
            </Button>
          </div>
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
