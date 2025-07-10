const Machine = require("../models/Machine");

exports.getAllMachines = async () => {
  return Machine.find();
};

exports.getMachineById = async (id) => {
  return Machine.findById(id);
};

exports.createMachine = async ({
  account_name,
  total_strategy_instances_ran,
  status,
}) => {
  const created_at = new Date().toISOString();
  const machine = new Machine({
    account_name,
    total_strategy_instances_ran: total_strategy_instances_ran || 0,
    status: status || null,
    created_at,
  });
  await machine.save();
  return machine;
};

exports.updateMachine = async (
  id,
  { account_name, total_strategy_instances_ran, status }
) => {
  const updated = await Machine.findByIdAndUpdate(
    id,
    { account_name, total_strategy_instances_ran, status },
    { new: true }
  );
  return updated;
};

exports.deleteMachine = async (id) => {
  const result = await Machine.findByIdAndDelete(id);
  return !!result;
};
