import React from "react";

interface ICarreauProps {
  image: JSX.Element;
  onClick: () => void;
}

export default function Carreau(props: ICarreauProps) {
  return (
    <button
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
        border: "2px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => {
        console.log("Bouton cliqué"); // Ajoutez ce log
        props.onClick();
      }}
    >
      {props.image}
    </button>
  );
}
