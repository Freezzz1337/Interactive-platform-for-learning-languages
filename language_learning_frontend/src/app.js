import './app.css';
import {Route, Routes} from "react-router-dom";
import AuthLoginRegister from "./pages/auth-login-register";
import HomePage from "./pages/start-page";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/auth" element={<AuthLoginRegister/>}/>
        </Routes>
    );
}

export default App;