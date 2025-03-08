'use client';

import Head from 'next/head';
import { Container, Button } from 'react-bootstrap';
import { FichaProvider } from '@/context/fichaContext';

import DynamicAccordion from '@/components/DynamicAccordion';
import accordionItemsFicha from '@/data/accordionItems';

export default function FichaRPG() {
  // Variáveis de exemplo (substitua conforme sua lógica)
  const nomePersonagem = 'Exemplo';
  const corPersonagem = 'Azul';
  const mana = 100;
  const nivel = 1;
  const pontosAtrib = 0;
  const magiaNome = '';
  const magiaEfeito = '';
  const raca = '';
  const subclasses = '';
  const resFisica = '';
  const resMagica = '';
  const pericias = [];

  // Função chamada ao clicar em "Atualizar" ou "Enviar" ficha
  const handleSubmit = (e) => {
    e.preventDefault();
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
      pericias,
    });
    alert('Ficha atualizada com sucesso!');
  };

  return (
    <>
      <Head>
        <title>Ficha Sussurros do Dragão</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container className="my-4">
        <h2 className="mb-3">Sussurros do Dragão | Ficha de Personagem</h2>

        <FichaProvider>
          <form onSubmit={handleSubmit}>
            <DynamicAccordion items={accordionItemsFicha} />
            <Button type="submit" variant="primary" className="mt-3">
              Enviar Ficha
            </Button>
          </form>
        </FichaProvider>
      </Container>
    </>
  );
}
