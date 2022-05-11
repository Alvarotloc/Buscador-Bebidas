import { useContext } from "react";
import CategoriasContext from '../context/CategoriaProvider';

const useCategorias = () => useContext(CategoriasContext);

export default useCategorias;