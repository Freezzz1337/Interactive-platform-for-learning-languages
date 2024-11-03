import './app.css';
import {Route, Routes} from "react-router-dom";
import AuthLoginRegister from "./pages/auth-login-register";

const App = () => {
    return (
        <Routes>
            <Route path="/registration" element={<AuthLoginRegister/>}/>
        </Routes>
    );
}

export default App;