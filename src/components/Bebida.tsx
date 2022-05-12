import type { Drink } from "../types/index";
import { Card, Col, Button, Placeholder } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
interface BebidaParams {
  bebida: Drink;
}

const Bebida = ({ bebida }: BebidaParams): JSX.Element => {
  const { idDrink,strDrink, strDrinkThumb } = bebida;
  const { handleModalClick, loading,handleBebidaIdClick } = useBebidas();
  return (
    <Col md={6} lg={3}>
      <Card className="mb-4">
        {loading ? (
          <Placeholder.Button variant='secondary' className='w-100 p-5' />
        ) : (
          <Card.Img
            src={strDrinkThumb}
            variant="top"
            alt={`Imagen de ${strDrink}`}
          />
        )}
        <Card.Body>
          {loading ? (
            <Placeholder xs={6}  bg="secondary"/>
          ) : (
            <Card.Title>{strDrink}</Card.Title>
          )}
          {loading ? (
            <Placeholder.Button variant="warning" className="w-100 mt-2"/>
          ) : (
            <Button
              className="w-100 text-uppercase mt-2"
              variant="warning"
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
