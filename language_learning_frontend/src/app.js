import './app.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AuthLoginRegister from "./pages/auth-login-register";
import StartPage from "./pages/start-page";
import HomePage from "./pages/home-page";
import {useContext} from "react";
import AuthContext from "./context/auth-context";
import CreateSet from "./pages/create-set";
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const location = useLocation();
    const hideHeaderAndFooter = "/useAuth".includes(location.pathname);


    return (
        <>
            {!hideHeaderAndFooter && <Header/>}
            <Routes>
                {isAuthenticated ?
                    <>
                        <Route path="/home" element={<HomePage/>}/>

                        <Route path="/createSet" element={<CreateSet/>}/>
                    </> :
                    <>
                        <Route path="/" element={<StartPage/>}/>
                        <Route path="/useAuth" element={<AuthLoginRegister/>}/>
                    </>}
                <Route path="*" element={<><h2>Page not found</h2></>}/>
            </Routes>
            {!hideHeaderAndFooter && <Footer/>}
        </>
    );
}

export default App;