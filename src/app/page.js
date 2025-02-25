"use client";

function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
  };
  return (
    <>
      <div style={containerStyle}>
        <h1>Olá, Pessoa!</h1>
        <h3>Esse projeto ainda está em construção!</h3>
        <p>
         Estamos correndo para poder aprender muito!
        </p>
        <figure>
          <img
            src="https://media1.tenor.com/m/lN7OvgMccHUAAAAC/sonic-sonic-the-hedgehog.gif"
            alt="Gif do Sonic Correndo"
            style={imgStyle}
          />
          <figcaption>Espere mais um pouquinho!</figcaption>
        </figure>
       
      </div>
    </>
  );
}

export default Home;
