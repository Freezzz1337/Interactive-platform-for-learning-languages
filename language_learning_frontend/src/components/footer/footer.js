import {Container} from "react-bootstrap";
import "./footer.css";
const Footer = () => {

    return (
        <footer className="footer mt-auto py-3 bg-light border-top">
            <Container>
                <p className="float-end mb-1">
                    <a href="#">GO top</a>
                </p>
                <p className="mb-1">© 2024 Company, Inc</p>
            </Container>
        </footer>
    );
};

export default Footer;
