"use client";
import { useState } from 'react';
import { Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';
import ListagemEscolhidaGroup from '@/components/listagemEscolhidaGroup';

const HABILIDADES_MAGICAS = [
  {
    id: 'GOLPEENERGIZADO',
    titulo: 'Golpe Energizado',
    descricao: 'O usuário dá um golpe energizado',
    tipo: 'combate',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Adiciona 1d8 + CG de dano mágico ao próximo ataque corpo a corpo.' },
      { nivel: 2, ptUso: 2, descricao: 'Adiciona 2d8 + CG de dano mágico ao próximo ataque corpo a corpo.' },
      { nivel: 3, ptUso: 3, descricao: 'Adiciona 3d8 + CG de dano mágico ao próximo ataque corpo a corpo. /r/n Permite dividir o dano entre dois alvos próximos.' }
    ]
  },
  {
    id: 'POSTURADEFENSIVA',
    titulo: 'Postura Defensiva',
    descricao: 'O usuário adota uma postura defensiva, aumentando sua defesa.',
    tipo: 'combate',
    nivel: [
      { nivel: 1, ptUso: 2, descricao: 'Reduz o dano recebido em 50% por 2 turnos.' },
      { nivel: 2, ptUso: 3, descricao: 'Reduz o dano recebido em 75% por 2 turnos.' },
      { nivel: 3, ptUso: 4, descricao: 'Reduz o dano recebido em 75% por 4 turnos. /r/n Também reflete 1d8 de dano ao atacante.' }
    ]
  },
  {
    id: 'AURAINSPIRADORA',
    titulo: 'Aura Inspiradora',
    descricao: 'Aliados em 6m recebem +2 em todos os testes até o próximo turno.',
    tipo: 'suporte',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Aliados em 6m recebem +2 em todos os testes até o próximo turno.' },
      { nivel: 2, ptUso: 2, descricao: 'Aliados em 6m recebem +4 em todos os testes até o próximo turno.' },
      { nivel: 3, ptUso: 3, descricao: 'Aliados em 6m recebem +4 em todos os testes até o próximo turno. Efeito dura 2 turnos.' }
    ]
  },
  {
    id: 'RECARGAMAGICA',
    titulo: 'Recarga Mágica',
    descricao: 'Recupera um pouco de mana para você ou um aliado.',
    tipo: 'suporte',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Recupera 1d6 + CG de mana para você ou um aliado.' },
      { nivel: 2, ptUso: 2, descricao: 'Recupera 1d6 + CG de mana para dois aliados ao mesmo tempo.' },
      { nivel: 3, ptUso: 3, descricao: 'Recupera 1d8 + CG de mana para dois aliados. /r/n Reduz o custo da próxima magia dos aliados em 1 nivel' }
    ]
  },
  {
    id: 'CAMPOPOTENCIAL',
    titulo: 'Campo Potencial',
    descricao: 'Cria uma pequena área onde as magias têm a potência de Magia Única Ampliada',
    tipo: 'magias únicas',
    nivel: [
      { nivel: 1, ptUso: 2, descricao: 'Cria uma área de 3m onde as magias têm a potência de Magia Única Ampliada em +1d6. Duração: 2 turnos.' },
      { nivel: 2, ptUso: 3, descricao: 'Cria uma área de 3m onde as magias têm a potência de Magia Única Ampliada (apenas para aliados) em +2d6. Duração: 2 turnos.' },
      { nivel: 3, ptUso: 4, descricao: 'Cria uma área de 5m onde as magias têm a potência de Magia Única Ampliada (apenas para aliados) em +3d6. Duração: 2d3 turnos.' }
    ]
  },
  {
    id: 'EXPLOSAOARCANA',
    titulo: 'Explosão Arcana',
    descricao: 'Causa dano explosivo em todos os inimigos proximos.',
    tipo: 'magias únicas',
    nivel: [
      { nivel: 1, ptUso: 2, descricao: 'Causa 1d8 + CG de dano em todos os inimigos em 6m.' },
      { nivel: 2, ptUso: 3, descricao: 'Causa 2d8 + CG de dano em todos os inimigos em 6m.' },
      { nivel: 3, ptUso: 4, descricao: 'Causa 3d8 + CG de dano em todos os inimigos em 9m.' }
    ]
  },
  {
    id: 'ATAQUESOMBRIO',
    titulo: 'Ataque Sombrio',
    descricao: 'Garante vantagem no próximo ataque contra um inimigo enquanto o personagem estiver furtivo.',
    tipo: 'utilidade',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Garante vantagem no próximo ataque enquanto estiver furtivo. Bônus: Adiciona 1d6 de dano.' },
      { nivel: 2, ptUso: 2, descricao: 'Garante vantagem no próximo ataque enquanto estiver furtivo. Bônus: Adiciona 2d6 de dano.' },
      { nivel: 3, ptUso: 3, descricao: 'Garante vantagem no próximo ataque enquanto estiver furtivo. Bônus: Adiciona 3d6 de dano. /r/n Ataque furtivo ignora resistências do inimigo.' }
    ]
  },
  {
    id: 'VISAODOFUTURO',
    titulo: 'Visão do Futuro',
    descricao: 'O mago realiza um pequeno ritual, invocando uma entidade que revela informações importantes.',
    tipo: 'utilidade',
    nivel: [
      { nivel: 1, ptUso: 3, descricao: 'Invoca uma entidade que revela informações importantes. Em combate, fornece dados sobre a criatura enfrentada.' },
      { nivel: 2, ptUso: 4, descricao: 'Invoca uma entidade que revela informações importantes. A entidade fornece duas informações distintas.' },
      { nivel: 3, ptUso: 5, descricao: 'Invoca uma entidade que revela informações importantes. A entidade fornece até 4 informações distintas. (pode oferecer certa resistencia)' }
    ]
  },
  {
    id: 'PASSODASSOMBRAS',
    titulo: 'Passo das Sombras',
    descricao: 'Permite atravessar zonas sombrias sem ser detectado',
    tipo: 'utilidade',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Permite atravessar zonas sombrias sem ser detectado por 1 turno, ou 15min.' },
      { nivel: 2, ptUso: 2, descricao: 'Fica indetectavel (exceto caso alguem use: Olhos Místicos ou CRITICO de Percepção) e concede +5 em testes de furtividade, por um turno ou 15min.' },
      { nivel: 3, ptUso: 3, descricao: 'Fica indetectavel (exceto caso alguem use: Olhos Místicos ou CRITICO de Percepção) e concede +10 em testes de furtividade e aumenta a agilidade(AGI) em +5, por 2 turnos ou 30min.' }
    ]
  },
  {
    id: 'OLHOSMISTICOS',
    titulo: 'Olhos Místicos',
    descricao: 'Detecta armadilhas, magias ocultas e passagens secretas em um raio de 9m.',
    tipo: 'utilidade',
    nivel: [
      { nivel: 1, ptUso: 1, descricao: 'Detecta armadilhas, magias ocultas, magos ocultos (furtivos), +3 de Percepção (5min ou 1 turno) e passagens secretas em um raio de 10m.' },
      { nivel: 2, ptUso: 2, descricao: 'Detecta armadilhas, magias ocultas, magos ocultos (furtivos), +6 de Percepção (10min ou 2d2 turno) e passagens secretas em um raio de 15m.' },
      { nivel: 3, ptUso: 3, descricao: 'Detecta armadilhas, magias ocultas, magos ocultos (furtivos), +9 de Percepção (15min ou 2d3 turno) e passagens secretas em um raio de 20m. Pode detectar fraquezas ou resistencias de até 1d3 inimigos em combate.' }
    ]
  }
];

const LIMIT_HABILIDADES_ESCOLHIDAS = 3;

const PONTOS_TOTAIS = 10;

export default function ContentFichaHabilidadesMagicas() {
  // Estados do componente
  const [ptDisponiveis, setPtDisponiveis] = useState(PONTOS_TOTAIS);
  const [habilidadeSelecionada, setHabilidadeSelecionada] = useState(null);
  const [habilidadesEscolhidas, setHabilidadesEscolhidas] = useState([]);
  const [erro, setErro] = useState('');

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  const handleSelectHabilidade = (event) => {
    const habilidade = HABILIDADES_MAGICAS.find(h => h.id === event.target.value);
    setHabilidadeSelecionada(habilidade);
  };

  const handleAdicionarHabilidade = () => {
    if (!habilidadeSelecionada) return;

    if (habilidadesEscolhidas.some(h => h.id === habilidadeSelecionada.id)) {
      setErro('Esta habilidade já foi adicionada!');
      return;
    }

    if (LIMIT_HABILIDADES_ESCOLHIDAS <= habilidadesEscolhidas.length) {
      setErro('Limite de habilidades atingido!');
      return;
    }

    setHabilidadesEscolhidas([...habilidadesEscolhidas, {
      id: habilidadeSelecionada.id,
      nome: habilidadeSelecionada.titulo,
      descricao: habilidadeSelecionada.descricao,
      niveis: habilidadeSelecionada.nivel.map(n => ({
        ...n,
        usado: false
      }))
    }]);

    resetCampos();
  };

  const handleRemoverHabilidade = (id) => {
    const habilidadeRemovida = habilidadesEscolhidas.find(h => h.id === id);
    const pontosLiberados = habilidadeRemovida.niveis
      .filter(n => n.usado)
      .reduce((sum, n) => sum + n.ptUso, 0);

    setPtDisponiveis(prev => prev + pontosLiberados);
    setHabilidadesEscolhidas(habilidadesEscolhidas.filter(h => h.id !== id));
  };

  const handleUsarNivel = (habilidadeId, nivel) => {
    setHabilidadesEscolhidas(prev => prev.map(h =>
      h.id === habilidadeId
        ? { 
            ...h, 
            niveis: h.niveis.map(n => 
              n.nivel === nivel 
                ? { ...n, usado: true } 
                : n
            )
          }
        : h
    ));

    setPtDisponiveis(prev => prev - nivel.ptUso);
  };

  const handleResetPontos = () => {
    const pontosUsados = habilidadesEscolhidas.reduce((total, h) => 
      total + h.niveis.filter(n => n.usado).reduce((sum, n) => sum + n.ptUso, 0),
      0
    );

    setPtDisponiveis(PONTOS_TOTAIS - pontosUsados);
  };

  // ---------------------------------------------------------------
  // FUNÇÕES AUXILIARES
  // ---------------------------------------------------------------

  const resetCampos = () => {
    setHabilidadeSelecionada(null);
    setErro('');
  };

  // ---------------------------------------------------------------
  // RENDERIZAÇÃO DO COMPONENTE
  // ---------------------------------------------------------------

  return (
    <>
      {/* Seção de Pontos */}
      <Row className="mb-4">
        <Col xs={12} md={{span:8,offset:2}}>
          <SubtituloFicha texto="Pontos de Habilidade" />
          <Row className='text-center'>
            <Col xs={6} md={{span:4,offset:2}}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                value={ptDisponiveis}
                onChange={(e) => setPtDisponiveis(Number(e.target.value))}
                className={ptDisponiveis < 0 ? 'text-danger' : ''}
              />
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={PONTOS_TOTAIS}
                readOnly
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12} className="d-grid">
              <Button variant="outline-secondary" onClick={handleResetPontos}>
                Resetar Pontos
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Lista de Habilidades Escolhidas */}
      <ListagemEscolhidaGroup
        titulo="Habilidades Escolhidas"
        itens={habilidadesEscolhidas}
        onRemoverItem={handleRemoverHabilidade}
        onUsarNivel={handleUsarNivel}
        pontosDisponiveis={ptDisponiveis}
        textoNenhumItem="Nenhuma habilidade escolhida."
      />

      {/* Formulário de Seleção */}
      <Row className="mb-3">
        <SubtituloFicha texto="Adicionar Habilidade" />
        
        <Col xs={12}>
          <Form.Label>Nome</Form.Label>
          <Form.Select 
            onChange={handleSelectHabilidade} 
            value={habilidadeSelecionada?.id || ''}
          >
            <option value="">Selecione uma habilidade</option>
            {HABILIDADES_MAGICAS.map((habilidade) => (
              <option key={habilidade.id} value={habilidade.id}>{habilidade.titulo}</option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} className="mt-3">
          <Form.Label>Descrição Geral</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={habilidadeSelecionada?.descricao || ''}
            readOnly
          />
        </Col>

        <Col xs={12} className="mt-3">
          {erro && <Alert variant="danger">{erro}</Alert>}
          <Button
            variant="outline-info"
            onClick={handleAdicionarHabilidade}
            disabled={!habilidadeSelecionada}
          >
            Adicionar Habilidade
          </Button>
        </Col>
      </Row>
    </>
  );
}