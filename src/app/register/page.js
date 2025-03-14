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
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { useLoading } from "@/context/loadingContext";
import Loader from "@/components/Loader";
import PopUp from "@/components/popUp";

import "@/app/styles/global.css";
import "@/app/styles/login.css";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(30, "Máximo 30 caracteres")
      .regex(/^[a-z0-9_]+$/, "Apenas letras minúsculas, números e _"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Pelo menos 1 letra maiúscula")
      .regex(/[0-9]/, "Pelo menos 1 número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      startLoading();
      setIsSubmitting(true);
      setServerError("");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.error || "Erro no cadastro");

      setShowPopUp(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
      stopLoading();
    }
  };

  if (loading) return <Loader message="Registrando..." />;

  return (
    <>
      <Head>
        <title>Criar nova conta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <PopUp
        title="Sucesso!"
        text="Cadastro realizado! Redirecionando para login..."
        variant="success"
        show={showPopUp}
        onClose={() => setShowPopUp(false)}
        duration={3000}
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
              Cadastre-se
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
                    controlId="floatingUsername"
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
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="email@exemplo.com"
                      isInvalid={!!errors.email}
                      {...register("email")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Senha"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      isInvalid={!!errors.password}
                      {...register("password")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingConfirmPassword"
                    label="Confirmar Senha"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Confirmar Senha"
                      isInvalid={!!errors.confirmPassword}
                      {...register("confirmPassword")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
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
                      <HowToRegIcon sx={{ marginRight: "10px" }} />
                      {isSubmitting ? "Registrando..." : "Criar Conta"}
                    </Button>
                  </div>

                  <div className="text-center">
                    <a href="/login" className="text-gold">
                      Já tem conta? Faça login
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
