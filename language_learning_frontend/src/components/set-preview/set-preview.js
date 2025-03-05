import "./set-preview.css";
import {Col, Container, Row} from "react-bootstrap";

const SetPreview = ({set, handleSetDetails}) => {

    return (
        <Container className="mt-2 mb-2 set-preview " fluid
                   onClick={(event)=> handleSetDetails(set.id,event)}>
            <Row>
                <Col xs={12} className="mt-2 first-block">
                    {set.numberOfWords} terms | {set.nameOfCreator}
                </Col>
                <Col xs={12}>
                    <h4>{set.setName}</h4>
                </Col>
            </Row>
        </Container>
    );
}
export default SetPreview;
