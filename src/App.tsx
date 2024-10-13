
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/route';
import './App.scss'
import Layout from "./components/Layout/Layout";

function App() {

    return (
        <Router>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
