// // Hides Add, Edit, Delete buttons when user lacks permission for Employee Module
// import { useAuth } from "../context/AuthContext";

// const PermissionWrapper = ({ permission, children }) => {
//     const { user } = useAuth();

//     if (!user?.permissions?.includes(permission)) {
//         return null;
//     }
//     return children;
// };

// export default PermissionWrapper;

import { useAuth } from "../context/AuthContext";

// Wraps any component and shows it only if user has permission for a module
const PermissionWrapper = ({ module, permission, children }) => {
  const { user } = useAuth();

  if (
    !user ||
    !user.permissions ||
    !user.permissions[module] ||
    !user.permissions[module].includes(permission)
  ) {
    return null;
  }

  return children;
};

export default PermissionWrapper;
