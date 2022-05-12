import { Button, Form, Row, Col,Alert } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import type { Drink } from "../types/index";
import { FormEvent, useState } from "react";

interface ICategorias {
  categorias: Drink[];
}

interface IBusqueda {
  nombre: string;
  categoria: string;
}

const Formulario = (): JSX.Element => {
  const [busqueda, setBusqueda] = useState<IBusqueda>({
    nombre: "",
    categoria: "",
  });
  const [alerta, setAlerta] = useState<string>('')
  const { categorias }: ICategorias = useCategorias();

  const handleSubmit = (e:FormEvent) => {
      e.preventDefault();

      if(Object.values(busqueda).includes('')){
        return setAlerta('Todos los campos son obligatorios')
      }
      setAlerta('');
  }


  return (
    <Form onSubmit={handleSubmit}>
        {alerta && <Alert variant="danger" className="text-center text-uppercase ">{alerta}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre Bebida</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="nombre"
              id="nombre"
              value={busqueda.nombre}
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
              value={busqueda.categoria}
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
      <Row className="justify-content-end">
        <Col md={3}>
          <Button variant="danger" className="text-uppercase w-100" type="submit">
            Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
