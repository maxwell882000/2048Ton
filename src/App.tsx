import './App.css';
import {Layout} from "./components/layout/Layout";
import {ReactNode} from "react";

interface AppProps {
    children: ReactNode;
}

function App({children}: AppProps) {
    return (
        <Layout>
            {children}
        </Layout>
    )

}

export default App;
