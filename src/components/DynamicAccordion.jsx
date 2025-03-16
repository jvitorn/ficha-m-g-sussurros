"use client";
import { Accordion, Row } from "react-bootstrap";

export default function DynamicAccordion({ items }) {
  return (
    <Row className="mb-4">
      <Accordion defaultActiveKey={items.length > 0 ? "0" : null} flush>
        {items.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Row>
  );
}
