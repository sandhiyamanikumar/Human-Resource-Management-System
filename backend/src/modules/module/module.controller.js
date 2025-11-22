const Module = require('./module.model');

// Create Module
exports.createModule = async (req, res) => {
    try {
        const mod = new Module(req.body);
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
        const mod = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(mod);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Module
exports.deleteModule = async (req, res) => {
    try {
        await Module.findByIdAndDelete(req.params.id);
        res.json({ message: 'Module deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
