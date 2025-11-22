module.exports = function (requiredModule, requiredPermission) {
    return (req, res, next) => {

        // Safety checks
        if (!req.user || !req.user.permissions) {
            return res.status(403).json({ message: "User permissions missing" });
        }

        const permissions = req.user.permissions;

        // Example: permissions = { admin: ["create","edit"], employee:["view"] }
        const modulePermissions = permissions[requiredModule];

        if (!modulePermissions) {
            return res.status(403).json({
                message: `No permissions for module: ${requiredModule}`
            });
        }

        if (!modulePermissions.includes(requiredPermission)) {
            return res.status(403).json({
                message: `Forbidden: Missing permission ${requiredModule}.${requiredPermission}`
            });
        }

        next();
    };
};
