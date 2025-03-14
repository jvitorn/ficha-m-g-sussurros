// components/PopUp.js
"use client";
import { useState } from "react";
import { Toast, Button } from "react-bootstrap";

export default function PopUp({
  title,
  text,
  variant = "success",
  test = false,
  duration = 3000,
  onShow,
  onClose,
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    onShow?.();
    if (duration) {
      setTimeout(() => setShow(false), duration);
    }
  };

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  const handleTest = () => {
    handleShow();
    setTimeout(handleClose, duration);
  };

  return (
    <>
      {test && (
        <Button
          variant="warning"
          onClick={handleTest}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            borderRadius: "50%",
            width: "60px",
            height: "60px",
          }}
          title="Testar Toast"
        >
          🚦
        </Button>
      )}

      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      >
        <Toast
          onClose={handleClose}
          show={show}
          delay={duration}
          autohide={!!duration}
          bg={variant}
        >
          <Toast.Header className={`bg-${variant} text-white`}>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body className={`bg-${variant} text-white`}>{text}</Toast.Body>
        </Toast>
      </div>
    </>
  );
}
