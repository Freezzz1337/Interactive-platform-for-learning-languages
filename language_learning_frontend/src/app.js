import './app.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AuthLoginRegisterPage from "./pages/auth-login-register-page";
import StartPage from "./pages/start-page";
import HomePage from "./pages/home-page";
import {useContext} from "react";
import AuthContext from "./context/auth-context";
import CreateSetPage from "./pages/create-set-page";
import Header from "./components/header";
import Footer from "./components/footer";
import SetPage from "./pages/set-page";

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

                        <Route path="/set/:id" element={<SetPage/>}/>
                        <Route path="/createSet" element={<CreateSetPage/>}/>
                    </> :
                    <>
                        <Route path="/" element={<StartPage/>}/>
                        <Route path="/useAuth" element={<AuthLoginRegisterPage/>}/>
                    </>}
                <Route path="*" element={<><h2>Page not found</h2></>}/>
            </Routes>
            {!hideHeaderAndFooter && <Footer/>}
        </>
    );
}

export default App;