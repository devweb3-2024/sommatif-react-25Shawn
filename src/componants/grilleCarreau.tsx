import React, { useEffect, useState } from "react";
import Carreau from "./carreau.componants";
import "./grilleCarreau.style.css";
import {
  Grid,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const GrilleCarreau: React.FC = () => {
  const [carreaux, setCarreaux] = useState<JSX.Element[]>([]);
  const [nbPairesTrouvees, setNbPairesTrouvees] = useState(0);
  const [compteur, setCompteur] = useState(20);
  const [aGagner, setAGagner] = useState(false);
  const [selectionDuJoueur, setselectionDuJoueur] = useState<number[]>([]);
  const [imagesMelangees, setImagesMelangees] = useState<string[]>([]);
  const [visibilites, setVisibilites] = useState<boolean[]>(
    Array(imagesMelangees.length).fill(false)
  );
  const images = [
    "chat1.png",
    "chat2.png",
    "chat3.png",
    "chat4.png",
    "chat5.png",
    "chat6.png",
    "chat7.png",
    "chat8.png",
  ];

  const imagesDoublons = [...images, ...images];
  const [EtatPopup, setEtatPopup] = useState(false);
  const [MessagePopup, setMessagePopup] = useState("");

  useEffect(() => {
    const melange = [...imagesDoublons].sort(() => Math.random() - 0.5);
    setImagesMelangees(melange);
  }, []);

  useEffect(() => {
    setCarreaux(
      imagesMelangees.map((image, index) => (
        <Carreau
          key={index}
          image={
            <img
              hidden={!visibilites[index]}
              className="image"
              src={image}
              alt="chat"
            />
          }
          onClick={() => handleClick(index)}
        />
      ))
    );
  }, [visibilites, imagesMelangees]);

  const handleClick = (index: number) => {
    if (selectionDuJoueur.length === 2 || nbPairesTrouvees === 8) {
      return;
    }
    const nouvelleSelection = [...selectionDuJoueur, index];
    setselectionDuJoueur(nouvelleSelection);

    const nouvellesVisibilites = [...visibilites];
    nouvellesVisibilites[index] = true;
    setVisibilites(nouvellesVisibilites);

    if (nouvelleSelection.length === 2) {
      const [premier, deuxieme] = nouvelleSelection;

      setCompteur(compteur - 1);

      if (imagesMelangees[premier] === imagesMelangees[deuxieme]) {
        setNbPairesTrouvees(nbPairesTrouvees + 1);
        nouvellesVisibilites[premier] = true;
        nouvellesVisibilites[deuxieme] = true;
        setVisibilites(nouvellesVisibilites);
      } else {
        setTimeout(() => {
          const resetVisibilites = [...nouvellesVisibilites];
          resetVisibilites[premier] = false;
          resetVisibilites[deuxieme] = false;
          setVisibilites(resetVisibilites);
        }, 1000);
      }

      setTimeout(() => setselectionDuJoueur([]), 1000);
    }
  };

  useEffect(() => {
    if (compteur === 0) {
      setVisibilites(Array(imagesMelangees.length).fill(true));
      setTimeout(() => {
        setEtatPopup(true);
        setMessagePopup("Vous avez perdu");
      }, 5000);
    }
  }, [compteur]);

  useEffect(() => {
    if (nbPairesTrouvees === 8) {
      setAGagner(false);
      setMessagePopup("Vous avez gagné!");
      setEtatPopup(true);
    }
  }, [nbPairesTrouvees]);

  const handleCloseDialog = () => {
    setEtatPopup(false);
    window.location.reload();
  };

  return (
    <>
      <div className="SousContainer">
        <button
          type="button"
          className="buttonRelancerJeu"
          onClick={() => window.location.reload()}
        >
          Relancer le jeu
        </button>
        <div className="nombreDeCoups">
          <p>Nombre de coups restants: {compteur}</p>
        </div>
      </div>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {carreaux.map((carreau, index) => (
          <Grid
            item
            xs={3}
            sx={{ width: "150px", height: "150px" }}
            key={index}
          >
            <p style={{ margin: "0" }}>{imagesMelangees[index]}</p>
            <Paper className="carreau">{carreau}</Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={EtatPopup} onClose={handleCloseDialog}>
        <DialogContent>
          <p>{MessagePopup}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Relancer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GrilleCarreau;
