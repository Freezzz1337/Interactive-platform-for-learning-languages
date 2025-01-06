import './app.css';
import {Route, Routes} from "react-router-dom";
import AuthLoginRegister from "./pages/auth-login-register";
import StartPage from "./pages/start-page";
import HomePage from "./pages/home-page";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/useAuth" element={<AuthLoginRegister/>}/>
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
    );
}

export default App;