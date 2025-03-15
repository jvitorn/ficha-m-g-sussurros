"use client";

const FolderCard = ({ title, href }) => {
  return (
    <div className="folder-card mx-auto">
      {href ? (
        <a href={href}>
          <div className="folder-tab"></div>
          <h5 className="mt-5">{title}</h5>
        </a>
      ) : (
        <>
          <div className="folder-tab"></div>
          <h5 className="mt-5">{title}</h5>
        </>
      )}
    </div>
  );
};

export default FolderCard;