const mongoose = require("mongoose");

const strategyInstanceSchema = new mongoose.Schema({
  strategy_name: { type: String, required: true },
  opening_time: { type: String },
  closing_time: { type: String },
  total_profit_loss: { type: Number },
  status: { type: String },
  total_trades_number: { type: Number },
  win_rate: { type: Number },
  machine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
  last_activity: { type: String },
});

module.exports = mongoose.model("StrategyInstance", strategyInstanceSchema);
