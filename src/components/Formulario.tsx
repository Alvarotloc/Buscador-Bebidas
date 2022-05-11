import {Button,Form,Row,Col} from 'react-bootstrap';
import useCategorias from '../hooks/useCategorias';
import type { Drink } from '../types/index';

interface ICategorias {
    categorias : Drink[]
}

const Formulario = ():JSX.Element => {
    const {categorias}:ICategorias = useCategorias();
  return (
    <Form>
        <Row>
            <Col md={6}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>
                    <Form.Control type='text' placeholder='Ej: Tequila, Vodka, etc' name='nombre' id='nombre' autoFocus/>
                </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className='mb-3'>
                    <Form.Label htmlFor='categoria'>Categoría Bebida</Form.Label>
                    <Form.Select id='categoria' name='categoria'>
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(({strCategory}) => (
                            <option key={strCategory} value={strCategory}>{strCategory}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row className='justify-content-end'>
            <Col md={3}>
                <Button variant='danger' className='text-uppercase w-100'>
                    Bucsar Bebidas
                </Button>
            </Col>
        </Row>
    </Form>
  )
}

export default Formulario