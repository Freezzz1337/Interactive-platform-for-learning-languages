import './app.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AuthLoginRegisterPage from "./pages/auth-login-register-page";
import StartPage from "./pages/start-page";
import HomePage from "./pages/home-page";
import {useContext} from "react";
import AuthContext from "./context/auth-context";
import CreateSetPage from "./pages/set-pages/create-set-page";
import Header from "./components/header";
import Footer from "./components/footer";
import SetDetailPage from "./pages/set-pages/set-detail-page";
import SetPage from "./pages/set-pages/set-page";
import FolderPage from "./pages/folder-pages/folder-page/folder-page";
import FolderDetailPage from "./pages/folder-pages/folder-detail-page";

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

                        <Route path="/sets" element={<SetPage/>}/>
                        <Route path="/set/:id" element={<SetDetailPage/>}/>
                        <Route path="/createSet" element={<CreateSetPage/>}/>

                        <Route path="/folders" element={<FolderPage/>}/>
                        <Route path="/folder/:id" element={<FolderDetailPage/>}/>
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