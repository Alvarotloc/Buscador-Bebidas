import { useContext } from "react";
import BebidasContext from '../context/BebidasProvider';

const useBebidas = () => useContext(BebidasContext);

export default useBebidas;