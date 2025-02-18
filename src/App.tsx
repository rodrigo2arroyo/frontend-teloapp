import './styles/global.scss';
import AppRoutes from "./routes/AppRoutes.tsx";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema de PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos base de componentes
import "primeicons/primeicons.css"; // Íconos de PrimeReact

const App = () => {
    return (
        <AppRoutes></AppRoutes>
    );
};

export default App;
