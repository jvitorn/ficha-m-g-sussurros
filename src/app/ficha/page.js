"use client";

import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

import DynamicAccordion from '@/components/DynamicAccordion';

import accordionItemsFicha from '@/data/accordionItems'; // Importação dos dados


export default function FichaRPG() {
 
  // Função chamada ao clicar em "Atualizar" ou "Enviar" ficha
  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode enviar os dados para uma API, salvar em BD, etc.
    console.log('Dados da ficha:', {
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
      pericias
    })
    alert('Ficha atualizada com sucesso!')
  }

 
  return (
    <>
      <Head>
        <title>Ficha Sussurros do Dragão</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container my-4">
        <h2 className="mb-3">Sussurros do Dragão | Ficha de Personagem</h2>

        <form onSubmit={handleSubmit}>
          <DynamicAccordion items={accordionItemsFicha} />
        </form>
      </div>
    </>
  )
}
