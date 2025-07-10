const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  account_name: { type: String, required: true },
  total_strategy_instances_ran: { type: Number, default: 0 },
  status: { type: String, default: null },
  created_at: { type: String, required: true },
});

module.exports = mongoose.model("Machine", machineSchema);
