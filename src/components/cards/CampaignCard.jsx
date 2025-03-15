"use client";

import { Card, ProgressBar } from "react-bootstrap";

const CampaignCard = ({ campaign }) => {
  return (
    <Card
      className="text-dark border-0 shadow"
      style={{ borderRadius: "10px" }}
    >
      <Card.Img
        src={campaign.image}
        alt={campaign.title}
        style={{
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          filter: "opacity(40%)",
        }}
      />
      <Card.ImgOverlay
        className="d-flex flex-column justify-content-end text-white"
        style={{ borderRadius: "10px" }}
      >
        <Card.Title className="display-6">{campaign.title}</Card.Title>
        <Card.Text className="mb-2">{campaign.description}</Card.Text>
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>Progresso da campanha:</span>
            <span>{campaign.progress}%</span>
          </div>
          <ProgressBar animated variant="success" now={campaign.progress} />
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default CampaignCard;
