import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import type { CategoryDrink, IBusqueda } from "../types/index";
import { FormEvent, useState } from "react";
import useBebidas from "../hooks/useBebidas";

interface ICategorias {
  categorias: CategoryDrink[];
}

const Formulario = (): JSX.Element => {
  const [busqueda, setBusqueda] = useState<IBusqueda>({
    ingrediente: "",
    categoria: "",
  });
  const [alerta, setAlerta] = useState<string>("");

  const { categorias }: ICategorias = useCategorias();

  const { consultarBebida,setIsFavoritePage } = useBebidas();

  const {categoria,ingrediente} = busqueda;

  const handleGoFavorites = () => {
    setIsFavoritePage(true);
    setBusqueda({ingrediente : '', categoria: ''});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(busqueda).includes("")) {
      return setAlerta("Todos los campos son obligatorios");
    }
    setAlerta("");
    consultarBebida(busqueda);
    setIsFavoritePage(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center text-uppercase ">
          {alerta}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ingrediente">Ingrediente Bebida</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="ingrediente"
              id="ingrediente"
              value={ingrediente}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
              autoFocus
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoría Bebida</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="">-- Selecciona Categoría --</option>
              {categorias.map(({ strCategory }) => (
                <option key={strCategory} value={strCategory}>
                  {strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col md={3}>
          <Button variant="danger" className="text-uppercase w-100 d-flex align-items-center gap-2 justify-content-center" onClick={handleGoFavorites}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            Bebidas Favoritas
          </Button>
        </Col>
        <Col md={3}>
          <Button
            className="text-uppercase w-100"
            type="submit"
          >
            Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
