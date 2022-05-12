import { useState,useEffect,createContext } from "react";
import type { CategoryDrink, IChildrenContext, ICategoryDrinks } from '../types/index';
import axios from 'axios';

const CategoriasContext = createContext<any>({});

const CategoriasProvider = ({children}:IChildrenContext) => {

    const [categorias, setCategorias] = useState<CategoryDrink[]>([]);

    useEffect(() => {
        const obtenerCategorias =async () => {
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

                const {data}:{data: ICategoryDrinks} = await axios(url);
                setCategorias(data.drinks);
            } catch (error) {
                throw error;
            }
        }
        obtenerCategorias();
    },[])

    return ( 
        <CategoriasContext.Provider value={{
            categorias
        }}>
            {children}
        </CategoriasContext.Provider>
    )
}

export {CategoriasProvider}

export default CategoriasContext