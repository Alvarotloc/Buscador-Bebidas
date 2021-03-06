import { useState, useEffect, createContext } from "react";
import type {
  Drink,
  IChildrenContext,
  IBebidas,
  IBusqueda,
} from "../types/index";
import axios from "axios";

const BebidasContext = createContext<any>({});

const BebidasProvider = ({ children }: IChildrenContext) => {
  const [bebidas, setBebidas] = useState<Drink[]>([]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingReceta, setLoadingReceta] = useState<boolean>(false);
  const [bebidaId, setBebidaId] = useState("");
  const [receta, setReceta] = useState<any>({});
  const [cocktailsFavorites, setCocktailsFavorites] = useState<Drink[]>([]);
  const [isFavoritePage, setIsFavoritePage] = useState(false);

  useEffect(() => {
    const cocktailsFavoritos =
      JSON.parse(localStorage.getItem("cocktails") || "[]") ?? [];

    if (cocktailsFavoritos.length === 0) return;

    setCocktailsFavorites(cocktailsFavoritos);
  }, []);

  useEffect(() => {
    if (cocktailsFavorites.length === 0) {
      localStorage.setItem("cocktails", JSON.stringify([]));
    }
    localStorage.setItem("cocktails", JSON.stringify(cocktailsFavorites));
    if (isFavoritePage) {
      setBebidas(cocktailsFavorites);
    }
  }, [cocktailsFavorites]);

  useEffect(() => {
    if (isFavoritePage) {
      setBebidas(cocktailsFavorites);
    }
  }, [isFavoritePage]);

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        setLoadingReceta(true);
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        throw error;
      } finally {
        setLoadingReceta(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const consultarBebida = async (datos: IBusqueda) => {
    const { ingrediente, categoria } = datos;
    try {
      setLoading(true);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

      const { data }: { data: IBebidas } = await axios(url);
      const bebidasFiltradas:Drink[] = [];
      if(data){
        data.drinks.forEach(async (bebida: Drink) => {
          const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebida.idDrink}`);
          if(data.drinks[0].strCategory === categoria){
            bebidasFiltradas.push(bebida);
          }
        });
      }
      setBebidas(bebidasFiltradas);
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleModalClick = () => setIsModalActive(!isModalActive);

  const handleBebidaIdClick = (id: string) => {
    setBebidaId(id);
  };

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        isModalActive,
        handleModalClick,
        loading,
        loadingReceta,
        handleBebidaIdClick,
        receta,
        setCocktailsFavorites,
        cocktailsFavorites,
        isFavoritePage,
        setIsFavoritePage,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
