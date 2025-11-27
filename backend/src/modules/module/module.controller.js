const Module = require('./module.model');
const Role = require('../role/role.model');

// Create Module
exports.createModule = async (req, res) => {
    try {
        const { moduleName, description, permissions } = req.body;

        // Optional: validate permissions
        const allowedPermissions = ["view", "create", "edit", "delete", "approve", "reject", "mark"];
        const validPermissions = Array.isArray(permissions)
            ? permissions.filter(p => allowedPermissions.includes(p))
            : [];

        const mod = new Module({
            moduleName: moduleName.toLowerCase().trim(),
            description,
            permissions: validPermissions,
        });

        await mod.save();
        res.status(201).json(mod);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Modules
exports.getModules = async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Module
exports.updateModule = async (req, res) => {
    try {
        const { moduleName, description, permissions } = req.body;

        const allowedPermissions = ["view", "create", "edit", "delete", "approve", "reject", "mark"];
        const validPermissions = Array.isArray(permissions)
            ? permissions.filter(p => allowedPermissions.includes(p))
            : [];

        const mod = await Module.findByIdAndUpdate(
            req.params.id,
            {
                moduleName: moduleName ? moduleName.toLowerCase().trim() : undefined,
                description,
                permissions: validPermissions
            },
            { new: true }
        );
        res.json(mod);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Module
exports.deleteModule = async (req, res) => {
    try {
        const moduleId = req.params.id;

        // Find the module first
        const mod = await Module.findById(moduleId);
        if (!mod) return res.status(404).json({ message: 'Module not found' });

        const moduleName = mod.moduleName;

        // Delete the module
        await Module.findByIdAndDelete(moduleId);

        // Remove this module from all roles' permissions
        await Role.updateMany(
            {},
            { $unset: { [`permissions.${moduleName}`]: "" } }
        );

        res.json({ message: 'Module and its permissions removed from all roles' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
