import { Modal, Image } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
const ModalBebida = (): JSX.Element => {
  const { isModalActive, handleModalClick, receta, loadingReceta } =
    useBebidas();

  const mostrarIngredientes = () => {
    let ingredientes = [];

    for (let index = 0; index <= 15; index++) {
      if (receta[`strIngredient${index}`]) {
        ingredientes.push(
          <li>
            {receta[`strIngredient${index}`]} {receta[`strMeasure${index}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    !loadingReceta ? (
      <Modal show={isModalActive} onHide={handleModalClick}>
        <Image
          src={receta.strDrinkThumb}
          alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
            {receta.strInstructions}
            <h2>Instrucciones y Cantidades</h2>
            {mostrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    ) : <></>
  );
};

export default ModalBebida;
