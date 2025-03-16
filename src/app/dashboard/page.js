"use client";

import { Container, Row, Col } from "react-bootstrap";
import NavbarDashboard from "@/components/NavbarDashboard";
import CampaignCard from "@/components/cards/CampaignCard";
import FolderCard from "@/components/cards/FolderCard";
import WelcomeStats from "@/components/ui/WelcomeStats";
// import CreationButtons from "@/components/buttons/CreateEstrutura"; // Botões com modal integrado
// import RoleBasedAccess from "@/components/RoleBasedAccess";

import "@/app/styles/dashboard.css";
import Head from "next/head";

export default function Dashboard() {
  const campaign = {
    id: 1,
    title: "Sussurros do Dragão",
    description:
      "Prepare-se para uma jornada repleta de desafios, magia e glória!",
    progress: 75,
    image: "/images/background/loginbackground.jpg",
  };

  const stats = {
    players: 240,
    fichas: 350,
    campanhas: 4,
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      {/* Navbar Componentizado */}
      <NavbarDashboard />
      {/* Conteúdo Principal */}
      <Container fluid>
        <Row className="justify-content-center w-100 mt-4 p-3">
          <Col md={11}>
            {/* Seção de Boas-Vindas e Estatísticas */}
            <WelcomeStats username="João" stats={stats} />
            {/* Seção de Criação de Estruturas que vai aparecer somente para GM */}
            
            {/* Seção de Campanhas */}
            <Row className="mb-5">
              <Col md={5} className="p-4 rounded shadow">
                <h6>Campanhas Ativas</h6>
                <CampaignCard campaign={campaign} />
              </Col>
              {/* Cards Laterais */}
              <Col md={6} className="mt-5">
                <Row className="mb-5">
                  <Col md={6}>
                    <FolderCard title="Fichas" href="/ficha" />
                  </Col>
                  <Col md={6}>
                    <FolderCard title="Campanhas" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FolderCard title="Perfil" />
                  </Col>
                  <Col md={6}>
                    <FolderCard title="Sobre" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
