// Maps employee module to either "Employee" OR "My Profile" dynamically
export function mapEmployeeModule(module, userPermissions) {
  if (module.moduleName !== "employee") return module;

  const hasMyProfilePermission = userPermissions?.includes("view-my-profile");

  // If user can ONLY view their profile (not all employees)
  if (hasMyProfilePermission && !userPermissions.includes("viewAll")) {
    return {
      ...module,
      label: "My Profile",
      path: "/my-profile",
    };
  }

  // HR/Admin case → keep as Employee Management
  return {
    ...module,
    label: "Employee",
    path: "/employee",
  };
}
