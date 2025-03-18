"use client";

import Head from "next/head";
import { Container, Button } from "react-bootstrap";
import { FichaProvider, useFicha } from "@/contexts/fichaContext";
import DynamicAccordion from "@/components/DynamicAccordion";
import accordionItemsFicha from "@/data/accordionItems";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useForm, FormProvider } from "react-hook-form";

// Componente interno que usa o contexto e o react-hook-form
function ConteudoFicha() {
  const { nomePersonagem } = useFicha();
  const methods = useForm(); // inicia o formulário
  const { handleSubmit } = methods;

  // Função de submit que envia os dados para a API
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Erro no servidor");
      alert("Ficha salva com sucesso!");
      console.log("Dados enviados:", data);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3 text-capitalize text-center">
        {`${nomePersonagem ? nomePersonagem : "Ficha do personagem"} | Sussurros do Dragão`}
      </h2>
      {/* Envolvemos o formulário com o FormProvider */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DynamicAccordion items={accordionItemsFicha} />
          <div className="text-center mt-4">
            <Button variant="primary" type="submit" size="lg">
              Salvar Personagem
            </Button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

// Componente principal que envolve o Provider do contexto
export default function FichaRPG() {
  return (
    <>
      <Head>
        <title>Ficha Sussurros do Dragão</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FichaProvider>
        <ThemeSwitcher />
        <ConteudoFicha />
      </FichaProvider>
    </>
  );
}
