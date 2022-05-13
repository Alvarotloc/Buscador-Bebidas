import type { Drink } from "../types/index";
import { Card, Col, Button, Placeholder } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import { useState, useEffect } from 'react';
interface BebidaParams {
  bebida: Drink;
}

const Bebida = ({ bebida }: BebidaParams): JSX.Element => {
  const { idDrink, strDrink, strDrinkThumb } = bebida;
  const { handleModalClick, loading, handleBebidaIdClick,setCocktailsFavorites,cocktailsFavorites } = useBebidas();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if(!!cocktailsFavorites.find((cocktail:Drink) => cocktail.idDrink === bebida.idDrink)){
      setIsFavorite(true);
    }
  },[]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if(isFavorite){
     return  setCocktailsFavorites(cocktailsFavorites.filter((cockatil:Drink) => cockatil.idDrink !== bebida.idDrink))
    }
    setCocktailsFavorites([...cocktailsFavorites,bebida]);
  }
  return (
    <Col md={6} lg={3}>
      <Card className="mb-4">
        {loading ? (
          <Placeholder.Button variant="secondary" className="w-100 p-5" />
        ) : (
          <div className="position-relative">
            <Card.Img
              src={strDrinkThumb}
              variant="top"
              alt={`Imagen de ${strDrink}`}
            />
            <div className="contenedor-corazon position-absolute top-0 end-0 bg-black" onClick={handleFavorite}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isFavorite ? "corazon activo" : "corazon"}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            </div>
          </div>
        )}
        <Card.Body>
          {loading ? (
            <Placeholder xs={6} bg="secondary" />
          ) : (
            <Card.Title className="titulo-bebida">{strDrink}</Card.Title>
          )}
          {loading ? (
            <Placeholder.Button className="w-100 mt-2" />
          ) : (
            <Button
              className="w-100 text-uppercase mt-2"
              onClick={() => {
                handleModalClick();
                handleBebidaIdClick(idDrink);
              }}
            >
              Ver Receta
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bebida;
