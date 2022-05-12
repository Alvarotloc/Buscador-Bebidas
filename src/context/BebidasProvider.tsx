import { useState,useEffect,createContext } from "react";
import type { Drink, IChildrenContext, IBebidas,IBusqueda } from '../types/index';
import axios from 'axios';

const BebidasContext = createContext<any>({});

const BebidasProvider = ({children}:IChildrenContext) => {
    const [bebidas, setBebidas] = useState<Drink[]>([]);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingReceta, setLoadingReceta] = useState<boolean>(false);
    const [bebidaId, setBebidaId] = useState('');
    const [receta, setReceta] = useState<any>({})

    useEffect(() => {
        const obtenerReceta =async () => {
            if(!bebidaId) return;

            try {
                setLoadingReceta(true);
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
                const {data} = await axios(url);
                setReceta(data.drinks[0]);
            } catch (error) {
                throw error;
            } finally {
                setLoadingReceta(false);
            }
        }
        obtenerReceta();
    },[bebidaId])

    const consultarBebida = async (datos:IBusqueda) => {
        const {nombre,categoria} = datos;
        try {
            setLoading(true);
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

            const {data}:{data : IBebidas} = await axios(url);
            setBebidas(data.drinks);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } catch (error) {
            throw error;
        }
    }

    const handleModalClick = () => setIsModalActive(!isModalActive);

    const handleBebidaIdClick = (id:string) => {
        setBebidaId(id);
    }

    return ( 
        <BebidasContext.Provider value={{
            consultarBebida,
            bebidas,
            isModalActive,
            handleModalClick,
            loading,
            loadingReceta,
            handleBebidaIdClick,
            receta
        }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {BebidasProvider}

export default BebidasContext