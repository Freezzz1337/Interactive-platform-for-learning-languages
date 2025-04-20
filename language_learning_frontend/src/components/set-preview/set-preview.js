import "./set-preview.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FiCheckCircle, FiPlusCircle} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";

const SetPreview = ({
                        set,
                        iconPlus = false,
                        showActionIcon = false,
                        isSelected,
                        showFolderDetailIcons = false,
                        handleDeleteSetFromFolder
                    }) => {

    if (showActionIcon || showFolderDetailIcons) {
        iconPlus = true;
    }

    return (
        <Container
            className={`mt-2 mb-2 set-preview ${showFolderDetailIcons ? `set-preview-anim-border` : `set-preview-anim-transform`}`}
            fluid>
            <Row className="align-items-center justify-content-between">
                <Col xs={iconPlus ? 10 : 12}>
                    <Row>
                        <Col xs={12} className="mt-2 first-block">
                            {set.numberOfWords} terms | {set.nameOfCreator}
                        </Col>
                        <Col xs={12}>
                            <h4>{set.setName}</h4>
                        </Col>
                    </Row>
                </Col>
                {showActionIcon && (
                    <Col xs={2} className="d-flex justify-content-end">
                        {isSelected
                            ? <FiCheckCircle className="mt-2" size={30}/>
                            : <FiPlusCircle className="mt-2" size={30}/>
                        }
                    </Col>)
                }
                {showFolderDetailIcons && (
                    <Col xs={2} className="d-flex justify-content-end ">
                        <Button variant="outline-dark" onClick={(e) => handleDeleteSetFromFolder(e, set.id)}>
                            <MdDeleteOutline size={"30px"}/>
                        </Button>
                    </Col>)
                }
            </Row>
        </Container>
    );
}
export default SetPreview;
