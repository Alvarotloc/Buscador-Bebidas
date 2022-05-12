import { useState,useEffect,createContext } from "react";
import type { Drink, IChildrenContext, IDrinks } from '../types/index';
import axios from 'axios';

const BebidasContext = createContext<any>({});

const BebidasProvider = ({children}:IChildrenContext) => {

    return ( 
        <BebidasContext.Provider value={{}}>
            {children}
        </BebidasContext.Provider>
    )
}

export {BebidasProvider}

export default BebidasContext