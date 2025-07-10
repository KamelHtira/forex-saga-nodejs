const machineService = require("../services/machineService");

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await machineService.getAllMachines();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMachineById = async (req, res) => {
  try {
    const machine = await machineService.getMachineById(req.params.id);
    if (!machine) return res.status(404).json({ error: "Machine not found" });
    res.json(machine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMachine = async (req, res) => {
  try {
    const { account_name, total_strategy_instances_ran, status } = req.body;
    const newMachine = await machineService.createMachine({
      account_name,
      total_strategy_instances_ran,
      status,
    });
    res.status(201).json(newMachine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMachine = async (req, res) => {
  try {
    const { account_name, total_strategy_instances_ran, status } = req.body;
    const updated = await machineService.updateMachine(req.params.id, {
      account_name,
      total_strategy_instances_ran,
      status,
    });
    if (!updated) return res.status(404).json({ error: "Machine not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    const deleted = await machineService.deleteMachine(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Machine not found" });
    res.json({ message: "Machine deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
