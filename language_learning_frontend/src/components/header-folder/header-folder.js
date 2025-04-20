import {Button, Col, Container, Row} from "react-bootstrap";
import {MdDeleteOutline, MdEdit} from "react-icons/md";
import {IoMdAdd} from "react-icons/io";
import WindowAddSetsToFolder from "../window-components/window-add-sets-to-folder";
import {useState} from "react";
import WindowEditNameFolder from "../window-components/window-edit-name-folder";
import WindowDeleteFolder from "../window-components/window-delete-folder";

const HeaderFolder = ({folderName = "", folderId, token, dataTriggerReload}) => {

    const [showModalAddSetToFolder, setShowModalAddSetToFolder] = useState(false);
    const [showModalEditSetToFolder, setShowModalEditSetToFolder] = useState(false);
    const [showModalDeleteFolder, setShowModalDeleteFolder] = useState(false);

    const handleEditFolder = () => {
        setShowModalEditSetToFolder(!showModalEditSetToFolder);
    }

    const handleAddSetToFolder = () => {
        setShowModalAddSetToFolder(!showModalAddSetToFolder);
    }

    const handleDeleteFolder = () => {
        setShowModalDeleteFolder(!showModalDeleteFolder);
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={6} md={4} className="d-flex justify-content-center justify-content-sm-start mb-2">
                    <h2>{folderName}</h2>
                </Col>
                <Col sm={6} md={8}>
                    <div className="d-flex justify-content-center justify-content-sm-end gap-2">
                        <Button type="button"
                                variant="outline-dark"
                                onClick={handleEditFolder}
                        >
                            <MdEdit size={"30px"}/>
                        </Button>
                        <Button type="button"
                                variant="outline-dark"
                                onClick={handleAddSetToFolder}
                        >
                            <IoMdAdd size={"30px"}/>
                        </Button>
                        <Button type="button"
                                variant="outline-dark"
                                onClick={handleDeleteFolder}
                        >
                            <MdDeleteOutline size={"30px"}/>
                        </Button>
                    </div>
                </Col>
            </Row>
            <hr/>

            <WindowEditNameFolder show={showModalEditSetToFolder}
                                  handleClose={handleEditFolder}
                                  folderId={folderId}
                                  dataTriggerReload={dataTriggerReload}
                                  folderName={folderName}
                                  token={token}/>

            <WindowAddSetsToFolder show={showModalAddSetToFolder}
                                   handleClose={handleAddSetToFolder}
                                   dataTriggerReload={dataTriggerReload}
                                   folderId={folderId}
                                   token={token}/>

            <WindowDeleteFolder show={showModalDeleteFolder}
                                handleClose={handleDeleteFolder}
                                dataTriggerReload={dataTriggerReload}
                                folderId={folderId}
                                token={token}/>

        </Container>
    );
}
export default HeaderFolder;

