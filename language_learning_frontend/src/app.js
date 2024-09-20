import './app.css';
import {Route, Routes} from "react-router-dom";
import Registration from "./pages/registration";

const App = () => {
    return (
        <Routes>
            <Route path="/registration" element={<Registration/>}/>
        </Routes>
    );
}

export default App;