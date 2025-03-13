'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useLoading } from '@/context/loadingContext';


import '@/app/styles/global.css';
import '@/app/styles/login.css';

import Head from 'next/head';

import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
// Icons
import LoginIcon from '@mui/icons-material/Login';

import Loader from '@/components/Loader';

export default function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      startLoading();
      setIsSubmitting(true);
      setServerError('');

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na autenticação');
      }

      const token = await response.json();

      // Armazenar token (ajuste conforme sua estratégia de armazenamento)
      localStorage.setItem('authToken', token);    
      
      router.push('/dashboard')

    } catch (error) {
      setServerError(error.message);
      stopLoading();
    } finally {
      setIsSubmitting(false);
      stopLoading();
    }
  };

  if (loading) {
    return <Loader message="Autenticando..." />;
  }

  return (
    <>
      <Head>
        <title>Logue no sistema</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <Container fluid className="login-background-container vh-100 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={4}>
            <h1 className='display-2 fw-bold fontLogoBold text-center text-white mb-3'>Login</h1>
            <Row>
              <Col md={12} className='p-5 rounded-5 fontLogoMedium bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Campo Username */}
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="GMago"
                      isInvalid={!!errors.username}
                      {...register('username', {
                        required: 'Usuário é obrigatório',
                        minLength: {
                          value: 3,
                          message: 'Mínimo 3 caracteres'
                        }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/* Campo Password */}
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-5"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      isInvalid={!!errors.password}
                      {...register('password', {
                        required: 'Senha é obrigatória',
                        minLength: {
                          value: 6,
                          message: 'Mínimo 6 caracteres'
                        }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <div className="d-grid gap-2 mb-3">
                    <Button
                      type="submit"
                      variant="outline-dark"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      <LoginIcon sx={{ marginRight: '10px' }} />
                      {isSubmitting ? 'Autenticando...' : 'Entrar'}
                    </Button>
                  </div>
                  <a href="/redefinedpass" className='text-center text-gold'>Esqueceu sua senha?</a>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}