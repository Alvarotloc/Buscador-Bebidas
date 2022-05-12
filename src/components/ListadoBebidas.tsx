import useBebidas from '../hooks/useBebidas';
import {Row} from 'react-bootstrap';
import type { Drink } from '../types/index';
import Bebida from './Bebida';

    interface IBebidas {
        bebidas : Drink[]
    }

const ListadoBebidas = ():JSX.Element => {
    const {bebidas}:IBebidas = useBebidas();
  return (
    <Row className='mt-5'>
        {bebidas.map(bebida => (
            <Bebida key={bebida.idDrink} bebida={bebida}/>
        ))}
    </Row>
  )
}

export default ListadoBebidas