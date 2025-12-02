const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true, lowercase: true, trim: true },
  description: { type: String },
  permissions: [
    {
      type: String,
      enum: [
        "view",
        "create",
        "edit",
        "delete",
        "approve",
        "reject",
        "cancel",
        "viewAll"
      ],
    },
  ],
});

module.exports = mongoose.model("Module", moduleSchema);
