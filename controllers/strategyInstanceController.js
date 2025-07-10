const strategyInstanceService = require("../services/strategyInstanceService");

exports.getAllStrategyInstances = async (req, res) => {
  try {
    const instances = await strategyInstanceService.getAllStrategyInstances();
    res.json(instances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStrategyInstanceById = async (req, res) => {
  try {
    const instance = await strategyInstanceService.getStrategyInstanceById(
      req.params.id
    );
    if (!instance)
      return res.status(404).json({ error: "Strategy instance not found" });
    res.json(instance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStrategyInstance = async (req, res) => {
  try {
    const data = req.body;
    const newInstance = await strategyInstanceService.createStrategyInstance(
      data
    );
    res.status(201).json(newInstance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStrategyInstance = async (req, res) => {
  try {
    const data = req.body;
    const updated = await strategyInstanceService.updateStrategyInstance(
      req.params.id,
      data
    );
    if (!updated)
      return res.status(404).json({ error: "Strategy instance not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStrategyInstance = async (req, res) => {
  try {
    const deleted = await strategyInstanceService.deleteStrategyInstance(
      req.params.id
    );
    if (!deleted)
      return res.status(404).json({ error: "Strategy instance not found" });
    res.json({ message: "Strategy instance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await strategyInstanceService.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStatsByMachineId = async (req, res) => {
  try {
    const { machineId } = req.params;
    const stats = await strategyInstanceService.getStatsByMachineId(machineId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStrategyInstancesByMachineId = async (req, res) => {
  try {
    const { machineId } = req.params;
    const instances =
      await strategyInstanceService.getStrategyInstancesByMachineId(machineId);
    res.json(instances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
