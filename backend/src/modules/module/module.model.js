const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    moduleName: { type: String, required: true },
    permissions: [{ type: String }],
});

module.exports = mongoose.model('Module', moduleSchema);
