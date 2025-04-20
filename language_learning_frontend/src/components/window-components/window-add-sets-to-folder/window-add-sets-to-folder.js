import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {addSetsToFolder, getSetsByFolderNotInFolder} from "../../../services/set-service";
import usePagination from "../../../hooks/usePagination";
import SetPreview from "../../set-preview";

const WindowAddSetsToFolder = ({show, handleClose, folderId, token, dataTriggerReload}) => {
    const {page, size, setShowMoreButton, showMoreButton, handleNextPage} = usePagination(undefined, 10);

    const [sets, setSets] = useState([]);
    const [selectedSetIds, setSelectedSetIds] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getSetsByFolderNotInFolder(folderId, page, size, token);
            if (serverResponse) {
                setSets(prevSets => [...prevSets, ...serverResponse]);
            }
        }

        if (!show) {
            setSelectedSetIds(new Set());
            setSets([]);
        } else {
            fetchData();
        }
    }, [show]);

    const handleAddSet = (e, setId) => {
        e.preventDefault();
        setSelectedSetIds(prevSet => {
            const newSet = new Set(prevSet);
            if (newSet.has(setId)) {
                newSet.delete(setId);
            } else {
                newSet.add(setId);
            }
            return newSet;
        })
    }

    const handleAddSetsSubmit = async (e) => {
        e.preventDefault();

        if (selectedSetIds) {
            const serverResponse = await addSetsToFolder(JSON.stringify({
                setIds: [...selectedSetIds].map(Number),
                folderId: folderId
            }), token);
            if (serverResponse) {
                handleClose();
                dataTriggerReload();
            }
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add sets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    sets.length === 0 ? (
                        <h5 className="text-center">
                            There are no available sets =(
                        </h5>
                    ) : (
                        sets.map((set, index) => (
                            <div key={index} onClick={(e) => handleAddSet(e, set.id)}>
                                <SetPreview set={set} showActionIcon={true}
                                            isSelected={selectedSetIds.has(set.id)}/>
                            </div>)
                        ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAddSetsSubmit} variant="outline-warning">Done</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default WindowAddSetsToFolder;