import React from "react";
import { Configuration, TransshipmentApi } from '@rodrigo2arroyo/frontend-sdk';

const apiConfig = new Configuration({ basePath: 'http://localhost:5125' });
const transshipmentApi = new TransshipmentApi(apiConfig);

const App = () => {
    //const [transshipments, setTransshipments] = React.useState([]);

    React.useEffect(() => {
        transshipmentApi.transshipmentGetAllTransshipments().then((response) => {
            console.warn(response)
        });
    }, []);

    return (
        <div>
            <h1>Transshipments</h1>

        </div>
    );
};

export default App;
