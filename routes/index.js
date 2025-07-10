const express = require("express");
const authRoutes = require("./auth");
const machineRouter = require("./machine");
const strategyInstanceRouter = require("./strategyInstance");

const router = express.Router();

router.use("/", authRoutes);
router.use("/machine", machineRouter);
router.use("/strategy-instance", strategyInstanceRouter);

module.exports = router;
