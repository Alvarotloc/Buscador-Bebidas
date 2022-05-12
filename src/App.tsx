import { Container } from "react-bootstrap";
import Formulario from "./components/Formulario";
import { CategoriasProvider } from "./context/CategoriaProvider";
import { BebidasProvider } from "./context/BebidasProvider";
import ListadoBebidas from './components/ListadoBebidas';
const App = (): JSX.Element => {
  return (
    <CategoriasProvider>
      <BebidasProvider>
        <header className="py-5">
          <h1>Buscador de Bebidas</h1>
        </header>
        <Container className="mt-5">
          <Formulario />
          <ListadoBebidas />
        </Container>
      </BebidasProvider>
    </CategoriasProvider>
  );
};

export default App;
