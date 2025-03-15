"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import Cookies from 'js-cookie'; 
import { useLoading } from "@/contexts/loadingContext";
import PopUp from "@/components/popUp";
import Loader from "@/components/Loader";

import "@/app/styles/global.css";
import "@/app/styles/login.css";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(30, "Máximo 30 caracteres")
    .regex(/^[a-z0-9_]+$/, "Apenas letras minúsculas, números e _"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Pelo menos 1 letra maiúscula")
    .regex(/[0-9]/, "Pelo menos 1 número"),
});

/**
 * Page de login do sistema. Contém um formulário para efetuar o login e uma
 * opção para criar uma nova conta.
 *
 * Também exibe um loader enquanto a autenticação est  sendo realizada e
 * exibe um popup de sucesso quando o login   efetuado com sucesso.
 *
 * @returns O JSX da p gina de login.
 */
export default function Signin() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => setMounted(true), []);

  const onSubmit = async (data) => {
    try {
      startLoading();
      setIsSubmitting(true);
      setServerError("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.error || "Erro na autenticação");

      // Armazenando o token em um cookie
      Cookies.set("authToken", responseData.token, { expires: 1 }); // O cookie expira

      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
      stopLoading();
    }
  };

  if (loading) return <Loader message="Autenticando..." />;

  return (
    <>
      <Head>
        <title>Logue no sistema</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <PopUp
        title="Login realizado!"
        text="Redirecionando para o dashboard..."
        variant="success"
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        duration={2000}
      />

      <Container
        fluid
        className="login-background-container vh-100 d-flex align-items-center justify-content-center"
      >
        <Row className="justify-content-center w-100">
          <Col md={4}>
            <h1
              className={
                "display-2 fw-bold fontLogoBold text-center mb-3 text-light"
              }
            >
              Login
            </h1>

            <Row>
              <Col
                md={12}
                className={clsx(
                  "p-5 rounded-5 fontLogoMedium themed-card",
                  mounted && resolvedTheme === "dark"
                    ? "border-secondary"
                    : "border-light"
                )}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  {serverError && (
                    <div className="alert alert-danger mb-4" role="alert">
                      {serverError}
                    </div>
                  )}

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="GMago"
                      isInvalid={!!errors.username}
                      {...register("username")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      isInvalid={!!errors.password}
                      {...register("password")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <div className="d-grid gap-2 mb-3">
                    <Button
                      type="submit"
                      variant={
                        mounted && resolvedTheme === "dark"
                          ? "outline-light"
                          : "outline-dark"
                      }
                      size="lg"
                      disabled={isSubmitting}
                    >
                      <LoginIcon sx={{ marginRight: "10px" }} />
                      {isSubmitting ? "Autenticando..." : "Entrar"}
                    </Button>
                  </div>

                  <div className="text-center">
                    <a href="/redefinedpass" className="text-gold me-3">
                      Esqueceu sua senha?
                    </a>
                    <a href="/register" className="text-gold">
                      Criar nova conta
                    </a>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
