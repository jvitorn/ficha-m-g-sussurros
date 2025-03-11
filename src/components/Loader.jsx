'use client';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ message = 'Carregando...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status" />
      <span className="mt-2">{message}</span>
    </div>
  );
};

export default Loader;
