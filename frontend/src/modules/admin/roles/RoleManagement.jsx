// // src/pages/admin/RoleManagement.jsx
// import React, { useEffect, useState } from "react";
// import { getRoles, createRole, updateRole, deleteRole } from "../../api/role.api";
// import { getModules } from "../../api/module.api"; // You'll need a simple GET /api/modules endpoint

// const RoleManagement = ({ user }) => {
//     const [roles, setRoles] = useState([]);
//     const [modules, setModules] = useState([]);
//     const [form, setForm] = useState({ roleName: "", permissions: {} });
//     const [editingRoleId, setEditingRoleId] = useState(null);

//     useEffect(() => {
//         if (!user.permissions.role.includes("view")) return;

//         fetchRoles();
//         fetchModules();
//     }, []);

//     const fetchRoles = async () => {
//         try {
//             const res = await getRoles();
//             setRoles(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchModules = async () => {
//         try {
//             const res = await getModules();
//             setModules(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleCheckbox = (moduleName, perm) => {
//         setForm({
//             ...form,
//             permissions: {
//                 ...form.permissions,
//                 [moduleName]: form.permissions[moduleName]
//                     ? form.permissions[moduleName].includes(perm)
//                         ? form.permissions[moduleName].filter(p => p !== perm)
//                         : [...form.permissions[moduleName], perm]
//                     : [perm],
//             },
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingRoleId) {
//                 await updateRole(editingRoleId, form);
//                 setEditingRoleId(null);
//             } else {
//                 await createRole(form);
//             }
//             setForm({ roleName: "", permissions: {} });
//             fetchRoles();
//         } catch (err) {
//             console.error(err);
//             alert("Error saving role");
//         }
//     };

//     const handleEdit = (role) => {
//         setForm({ roleName: role.roleName, permissions: role.permissions });
//         setEditingRoleId(role._id);
//     };

//     const handleDelete = async (roleId) => {
//         if (!window.confirm("Are you sure?")) return;
//         try {
//             await deleteRole(roleId);
//             fetchRoles();
//         } catch (err) {
//             console.error(err);
//             alert("Error deleting role");
//         }
//     };

//     if (!user.permissions.role.includes("view")) return <p>Access Denied</p>;

//     return (
//         <div>
//             <h2>Role Management</h2>

//             {/* Role Form */}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Role Name"
//                     value={form.roleName}
//                     onChange={(e) => setForm({ ...form, roleName: e.target.value })}
//                     required
//                 />

//                 {modules.map((mod) => (
//                     <div key={mod.moduleName}>
//                         <h4>{mod.moduleName}</h4>
//                         {mod.permissions.map((perm) => (
//                             <label key={perm} style={{ marginRight: "10px" }}>
//                                 <input
//                                     type="checkbox"
//                                     checked={form.permissions[mod.moduleName]?.includes(perm) || false}
//                                     onChange={() => handleCheckbox(mod.moduleName, perm)}
//                                 />
//                                 {perm}
//                             </label>
//                         ))}
//                     </div>
//                 ))}

//                 <button type="submit">{editingRoleId ? "Update Role" : "Create Role"}</button>
//             </form>

//             {/* Role List */}
//             <h3>Existing Roles</h3>
//             <table border="1" cellPadding="5">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Modules & Permissions</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {roles.map((role) => (
//                         <tr key={role._id}>
//                             <td>{role.roleName}</td>
//                             <td>
//                                 {Object.entries(role.permissions).map(([mod, perms]) => (
//                                     <div key={mod}>
//                                         <strong>{mod}</strong>: {perms.join(", ")}
//                                     </div>
//                                 ))}
//                             </td>
//                             <td>
//                                 <button onClick={() => handleEdit(role)}>Edit</button>
//                                 <button onClick={() => handleDelete(role._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default RoleManagement;
