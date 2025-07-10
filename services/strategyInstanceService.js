const StrategyInstance = require("../models/StrategyInstance");
const Machine = require("../models/Machine");

exports.getAllStrategyInstances = async () => {
  return StrategyInstance.find();
};

exports.getStrategyInstanceById = async (id) => {
  return StrategyInstance.findById(id);
};

exports.createStrategyInstance = async (data) => {
  const instance = new StrategyInstance(data);
  await instance.save();
  return instance;
};

exports.updateStrategyInstance = async (id, data) => {
  const updated = await StrategyInstance.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updated;
};

exports.deleteStrategyInstance = async (id) => {
  const result = await StrategyInstance.findByIdAndDelete(id);
  return !!result;
};

exports.getStats = async () => {
  // Count active machines
  const totalActiveMachines = await Machine.countDocuments({
    status: "ACTIVE",
  });

  // Find all active strategies
  const activeStrategies = await StrategyInstance.find({ status: "ACTIVE" });
  const totalActiveStrategies = activeStrategies.length;

  // Total profit and win rate
  let totalProfit = 0;
  let winRateSum = 0;
  for (const s of activeStrategies) {
    totalProfit += s.total_profit_loss || 0;
    winRateSum += s.win_rate || 0;
  }
  const winRate =
    totalActiveStrategies > 0 ? winRateSum / totalActiveStrategies : 0;

  return {
    totalActiveMachines,
    totalActiveStrategies,
    totalProfit,
    winRate,
  };
};

exports.getStatsByMachineId = async (machineId) => {
  // Find all active strategies for the given machine
  const activeStrategies = await StrategyInstance.find({
    status: "ACTIVE",
    machine_id: machineId,
  });
  const totalActiveStrategies = activeStrategies.length;

  // Total profit, win rate, and total trades
  let totalProfit = 0;
  let winRateSum = 0;
  let totalTrades = 0;
  for (const s of activeStrategies) {
    totalProfit += s.total_profit_loss || 0;
    winRateSum += s.win_rate || 0;
    totalTrades += s.total_trades_number || 0;
  }
  const winRate =
    totalActiveStrategies > 0 ? winRateSum / totalActiveStrategies : 0;

  return {
    totalActiveStrategies,
    totalProfit,
    winRate,
    totalTrades,
  };
};

exports.getStrategyInstancesByMachineId = async (machineId) => {
  return StrategyInstance.find({ machine_id: machineId });
};
