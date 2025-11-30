// Hides Add, Edit, Delete buttons when user lacks permission for Employee Module 
import { useAuth } from "../context/AuthContext";

const PermissionWrapper = ({ permission, children }) => {
    const { user } = useAuth();

    if (!user?.permissions?.includes(permission)) {
        return null;
    }
    return children;
};

export default PermissionWrapper;
