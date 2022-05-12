import { useState,useEffect,createContext } from "react";
import type { Drink, IChildrenContext, IBebidas,IBusqueda } from '../types/index';
import axios from 'axios';

const BebidasContext = createContext<any>({});

const BebidasProvider = ({children}:IChildrenContext) => {
    const [bebidas, setBebidas] = useState<Drink[]>([]);

    const consultarBebida =async (datos:IBusqueda) => {
        const {nombre,categoria} = datos;
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

            const {data}:{data : IBebidas} = await axios(url);
            setBebidas(data.drinks);
        } catch (error) {
            throw error;
        }
    }

    return ( 
        <BebidasContext.Provider value={{
            consultarBebida,
            bebidas
        }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {BebidasProvider}

export default BebidasContext