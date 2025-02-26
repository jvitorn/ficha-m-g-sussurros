"use client";
// Hooks do React
import { useState, useMemo } from 'react';
// Componentes do React Bootstrap
import { Row, Col, Form, Alert, Button, Modal } from 'react-bootstrap';
// Contexto para gerenciamento de estado global dos atributos
import { useAtributos } from '@/context/fichaContext';
// Componente customizado de subtítulo
import SubtituloFicha from '@/components/subtituloFicha';



export default function ContentFichaAtributos() {
  // Busca os dados e funções do contexto de atributos
  const {
    atributos,          // Lista de atributos do personagem
    atualizarAtributo,  // Função para atualizar um atributo
    resetAtributos,     // Função para resetar todos os atributos
    NIVEL_LIST          // Lista de níveis disponíveis
  } = useAtributos();

  // Estados locais do componente
  const [nivelSelecionado, setNivelSelecionado] = useState(NIVEL_LIST[0].id); // ID do nível atual
  const [pontosAtribTotal, setPontosAtribTotal] = useState(NIVEL_LIST[0].pontosAtribuicao); // Pontos totais do nível
  const [erro, setErro] = useState(''); // Mensagens de erro
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Controle do modal de confirmação
  const [proximoNivel, setProximoNivel] = useState(null); // Armazena o nível selecionado pendente de confirmação

  // ---------------------------------------------------------------
  // CÁLCULOS MEMOIZADOS (optimizados para performance)
  // ---------------------------------------------------------------

  // Calcula o total de pontos gastos nos atributos
  const pontosAtributosTotal = useMemo(() =>
    atributos.reduce((acc, { valor }) => acc + valor, 0),
    [atributos] // Recálculo só ocorre quando atributos mudam
  );

  // Calcula pontos disponíveis (total - gastos)
  const pontosDisponiveis = useMemo(() =>
    pontosAtribTotal - pontosAtributosTotal,
    [pontosAtribTotal, pontosAtributosTotal] // Recálculo quando qualquer um mudar
  );

  // ---------------------------------------------------------------
  // MANIPULADORES DE EVENTOS
  // ---------------------------------------------------------------

  /**
   * Atualiza o valor de um atributo específico
   * @param {number} index - Índice do atributo na lista
   * @param {string} newValue - Novo valor do atributo (vindo do input)
   */
  const handleChangeAttr = (index, newValue) => {
    // Converte para número e garante valor mínimo de 0
    const valorNumerico = Math.max(Number(newValue) || 0);

    // Cria nova lista de atributos com o valor atualizado
    const novosAtributos = atributos.map((attr, i) =>
      i === index ? { ...attr, valor: valorNumerico } : attr
    );

    // Calcula o novo total de pontos gastos
    const novoTotal = novosAtributos.reduce((acc, { valor }) => acc + valor, 0);

    // Validação de pontos excedidos
    if (novoTotal > pontosAtribTotal) {
      setErro('Pontos de atribuição excedidos!');
      return;
    }

    // Se válido, atualiza o contexto e limpa erros
    setErro('');
    atualizarAtributo(atributos[index].sigla, valorNumerico);
  };

  /**
   * Manipula a seleção de novo nível no dropdown
   * @param {Event} event - Evento de mudança do select
   */
  const handleSelectNivel = (event) => {
    const nivel = NIVEL_LIST.find(n => n.id === event.target.value);

    if (nivel && nivel.id !== nivelSelecionado) {
      // Verifica se o novo nível tem pontos suficientes
      if (pontosAtributosTotal > nivel.pontosAtribuicao) {
        // Se não tiver, mostra modal de confirmação
        setProximoNivel(nivel);
        setShowConfirmModal(true);
      } else {
        // Se tiver, muda direto
        confirmarMudancaNivel(nivel);
      }
    }
  };

  /**
   * Confirma a mudança de nível e reseta atributos
   * @param {Object} nivel - Novo nível selecionado
   */
  const confirmarMudancaNivel = (nivel,resetAttr) => {
    // Atualiza estados
    setNivelSelecionado(nivel.id);
    setPontosAtribTotal(nivel.pontosAtribuicao);
    if(resetAttr) resetAtributos();
    // Fecha modal e limpa erros
    setShowConfirmModal(false);
    setErro('');
  };

  /**
   * Reseta todos os atributos mantendo o nível atual
   */
  const handleResetAtributos = () => {
    resetAtributos();
    setErro('');
  };

  // ---------------------------------------------------------------
  // RENDERIZAÇÃO DO COMPONENTE
  // ---------------------------------------------------------------

  return (
    <>
      {/* Modal de confirmação para mudança de nível */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Mudança de Nível</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ao mudar para o nível {proximoNivel?.titulo}, todos os pontos de atribuição serão resetados. Deseja continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => confirmarMudancaNivel(proximoNivel,true)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Seção de atributos - 6 colunas responsivas */}
      <Row className="mb-3">
        {atributos.map(({ sigla, nome, valor }, index) => (
          <Col xs={4} md={2} className="mb-3" key={sigla}>
            <Form.Label><b>{sigla}</b></Form.Label>
            {/* Input numérico para cada atributo */}
            <Form.Control
              type="number"
              min="0"
              placeholder={sigla}
              value={valor}
              onChange={(e) => handleChangeAttr(index, e.target.value)}
              disabled={pontosDisponiveis <= 0} // Desabilita quando não há pontos
            />
            <Form.Text className="text-muted">{nome}</Form.Text>
          </Col>
        ))}
      </Row>

      {/* Seção de nível e pontos de atribuição */}
      <Row className="mb-3">
        {/* Dropdown de seleção de nível */}
        <Col xs={12} md={4}>
          <SubtituloFicha texto='Nível' />
          <Form.Select
            value={nivelSelecionado}
            onChange={handleSelectNivel}
            className="mb-3"
          >
            {NIVEL_LIST.map(({ id, titulo }) => (
              <option key={id} value={id}>{titulo}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Painel de pontos de atribuição */}
        <Col xs={12} md={8} className="text-center">
          <SubtituloFicha texto='Pontos de Atribuição' />

          {/* Exibição de erros */}
          {erro && <Alert variant="danger" className="mb-2">{erro}</Alert>}

          <Row>
            {/* Pontos disponíveis */}
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <Form.Label>Disponíveis</Form.Label>
              <Form.Control
                type="number"
                value={pontosDisponiveis}
                disabled
                className={pontosDisponiveis < 0 ? 'text-danger' : ''} // Destaca negativo
              />
            </Col>

            {/* Pontos totais do nível */}
            <Col xs={6} md={4}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={pontosAtribTotal}
                disabled
              />
            </Col>
          </Row>

          {/* Botão de reset manual */}
          <Button
            variant="outline-danger"
            onClick={handleResetAtributos}
            className="mt-3"
            aria-label="Resetar todos os atributos para zero"
          >
            Resetar Atributos
          </Button>
        </Col>
      </Row>
    </>
  );
}