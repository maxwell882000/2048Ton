import './App.css';
import {Layout} from "./components/layout/Layout";
import {Outlet} from "react-router-dom";
import {Routing} from "./pages/start/Routing";


function App() {
    return (
        <Layout>
            <Routing></Routing>
            <Outlet/>
        </Layout>
    )

}

export default App;
