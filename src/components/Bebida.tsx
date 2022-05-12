import type { Drink } from '../types/index';
import {Card,Col,Button} from 'react-bootstrap';
interface BebidaParams {
    bebida : Drink
}

const Bebida = ({bebida}:BebidaParams):JSX.Element => {
    const {strDrink,strDrinkThumb} = bebida;
  return (
    <Col md={6} lg={3}>
        <Card className='mb-4'>
            <Card.Img src={strDrinkThumb} variant='top' alt={`Imagen de ${strDrink}`}/>
            <Card.Body>
                <Card.Title>{strDrink}</Card.Title>
                <Button className='w-100 text-uppercase mt-2' variant='warning'>Ver Receta</Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Bebida