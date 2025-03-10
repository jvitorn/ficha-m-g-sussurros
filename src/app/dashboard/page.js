'use client';

import { Container, Navbar, Nav } from 'react-bootstrap';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      {/* Container flexível para centralizar e ajustar a largura dinamicamente */}
      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 d-flex justify-content-center">
        <Navbar className="bg-light shadow-lg p-2 rounded-4 w-100 mb-4" style={{ maxWidth: '90%', minWidth: '320px', maxWidth: '500px' }}>
          <Nav className="w-100 d-flex justify-content-around">
            <Nav.Link href="#home" className="text-center">
              <HomeIcon fontSize="large" />
              <div>Home</div>
            </Nav.Link>
            <Nav.Link href="#campaigns" className="text-center">
              <ArticleIcon fontSize="large" />
              <div>Campanhas</div>
            </Nav.Link>
            <Nav.Link href="#characters" className="text-center">
              <AssignmentIndIcon fontSize="large" />
              <div>Fichas</div>
            </Nav.Link>
            <Nav.Link href="#logout" className="text-center">
              <MeetingRoomRoundedIcon fontSize="large" />
              <div>Desconectar</div>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
}
