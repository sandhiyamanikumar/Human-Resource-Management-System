import { Toast, ToastContainer } from "react-bootstrap";
import { useToast } from "../context/ToastContext";

const ToastComponent = () => {
    const { toast, hideToast } = useToast();

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                show={toast.show}
                bg={toast.variant}
                onClose={hideToast}
                delay={3000}
                autohide
            >
                <Toast.Body className="text-white">{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastComponent;
