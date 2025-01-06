import Header from "../../components/header";
import Footer from "../../components/footer";
import {Container} from "react-bootstrap";
import {useContext, useEffect} from "react";
import AuthContext from "../../context/auth-context";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {

    return (
        <>
            <Header/>

            <Container>
                <h2>Latest</h2>
                <h2>Popular flashcard sets</h2>
            </Container>
            <Footer/>
        </>
    );
}
export default HomePage;