import {Button, Container} from "react-bootstrap";
import {RiEmotionSadLine} from "react-icons/ri";
import "./error.css";

const Error = ({handleTryAgain}) => {
    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center vh-100 ">
                <div className="flex-column text-center error-frame" >
                    <RiEmotionSadLine size="60px"/>
                    <h2>Something went wrong :(</h2>
                    <Button variant="outline-warning"
                            size="lg"
                            onClick={handleTryAgain}>Try again</Button>
                </div>
            </div>
        </Container>
    );
}
export default Error;