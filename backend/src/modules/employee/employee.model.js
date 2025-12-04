// models/employee.model.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    authUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // link to Auth
    name: { type: String, required: true },
    email: { type: String, required: true },
    orgId: { type: String },
    phone: { type: String },
    department: { type: String },
    designation: { type: String },
    dateOfJoining: { type: Date },
    manager: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // include virtuals in JSON
    toObject: { virtuals: true }, // include virtuals in plain objects
  }
);

// Virtual field to get status from Auth user
employeeSchema.virtual("status").get(function () {
  if (this.authUser && this.authUser.status) {
    return this.authUser.status; // get status from Auth
  }
  return "Pending"; // default if authUser not populated
});

module.exports = mongoose.model("Employee", employeeSchema);
