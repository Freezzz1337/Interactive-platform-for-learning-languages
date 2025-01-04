import {Button, Col, Container, Row} from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import FeaturesCarousel from "../../components/features-carousel";

import "./start-page.css";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigation = useNavigate();
    const handleLogIn = (e) => {
        e.preventDefault();
        navigation("/auth", {state: {isAuthenticatedPage: true}})
    }

    const handleRegister = (e) => {
        e.preventDefault();
        navigation("/auth", {state: {isAuthenticatedPage: false}})
    }
    return (
        <>
            <Header/>
            <FeaturesCarousel/>

            <Container>
                <h2 className="text-center my-4 px-3" style={{fontFamily: '"Brush Script MT", cursive'}}>Welcome to
                    Wordly, your
                    gateway to language learning!</h2>

                <Row className="get-start-bg mt-3 mb-3">
                    <Col lg={6} className="text-center">
                        <h2>Ready to Get Started?</h2>
                        <p>Join us today and find the perfect project or freelancer for your needs.</p>
                    </Col>
                    <Col lg={6} className="text-center">
                        <div className="mb-2">
                            <Button variant="outline-secondary"
                                    className="w-50 rounded-0"
                                    style={{height: "50px"}}
                                    onClick={handleLogIn}
                            >Log in</Button>
                        </div>
                        <div>
                            <Button variant="outline-secondary"
                                    className="w-50 rounded-0"
                                    style={{height: "50px"}}
                                    onClick={handleRegister}
                            >Sing Up</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}
export default HomePage;