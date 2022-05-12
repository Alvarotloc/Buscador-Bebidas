export interface IChildrenContext {
    children : JSX.Element | JSX.Element[]
}// Generated by https://quicktype.io

export interface ICategoryDrinks {
    drinks: CategoryDrink[];
}

export interface CategoryDrink {
    strCategory: string;
}

export interface IBusqueda {
    nombre: string;
    categoria: string;// Generated by https://quicktype.io
}
export interface IBebidas {
    drinks: Drink[];
}

export interface Drink {
    strDrink:      string;
    strDrinkThumb: string;
    idDrink:       string;
}