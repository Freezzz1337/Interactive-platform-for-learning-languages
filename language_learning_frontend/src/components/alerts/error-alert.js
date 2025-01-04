import {Toast, ToastContainer} from "react-bootstrap";
import {useState} from "react";

const ErrorAlert = ({error,setError}) => {
    const [showToast, setShowToast] = useState(true);

    const handleClose = () => {
        setShowToast(false);
        setError(null);
    }

    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast
                show={showToast}
                onClose={handleClose}
                className="bg-danger text-white"
                style={{width: '400px', fontSize: '1.2rem'}}>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{error}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
export default ErrorAlert;