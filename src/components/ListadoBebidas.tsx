import useBebidas from "../hooks/useBebidas";
import { Row } from "react-bootstrap";
import type { Drink } from "../types/index";
import Bebida from "./Bebida";

interface IBebidasProvider {
  bebidas: Drink[];
  isFavoritePage: boolean;
}

const ListadoBebidas = (): JSX.Element => {
  const { bebidas, isFavoritePage }: IBebidasProvider = useBebidas();
  return (
    <Row className="mt-5">
      {bebidas.length > 0 ? (
        bebidas.map((bebida: Drink) => (
          <Bebida key={bebida.idDrink} bebida={bebida} />
        ))
      ) : isFavoritePage ? (
        <h1 className="text-center text-uppercase">No hay bebidas</h1>
      ) : (
        ""
      )}
    </Row>
  );
};

export default ListadoBebidas;
