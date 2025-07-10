/**
 * @swagger
 * tags:
 *   name: StrategyInstance
 *   description: Strategy Instance management
 */

/**
 * @swagger
 * /api/strategy-instance:
 *   get:
 *     summary: Get all strategy instances
 *     tags: [StrategyInstance]
 *     responses:
 *       200:
 *         description: List of strategy instances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StrategyInstance'
 *   post:
 *     summary: Create a new strategy instance
 *     tags: [StrategyInstance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StrategyInstanceInput'
 *     responses:
 *       201:
 *         description: Strategy instance created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StrategyInstance'
 *
 * /api/strategy-instance/{id}:
 *   get:
 *     summary: Get a strategy instance by ID
 *     tags: [StrategyInstance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Strategy Instance ID
 *     responses:
 *       200:
 *         description: Strategy instance found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StrategyInstance'
 *       404:
 *         description: Strategy instance not found
 *   put:
 *     summary: Update a strategy instance
 *     tags: [StrategyInstance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Strategy Instance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StrategyInstanceInput'
 *     responses:
 *       200:
 *         description: Strategy instance updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StrategyInstance'
 *       404:
 *         description: Strategy instance not found
 *   delete:
 *     summary: Delete a strategy instance
 *     tags: [StrategyInstance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Strategy Instance ID
 *     responses:
 *       200:
 *         description: Strategy instance deleted
 *       404:
 *         description: Strategy instance not found
 *
 * /api/strategy-instance/stats:
 *   get:
 *     summary: Get statistics about strategies and machines
 *     tags: [StrategyInstance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics about active machines and strategies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalActiveMachines:
 *                   type: integer
 *                   description: Number of machines with ACTIVE status
 *                 totalActiveStrategies:
 *                   type: integer
 *                   description: Number of strategies with ACTIVE status
 *                 totalProfit:
 *                   type: number
 *                   description: Sum of total_profit_loss for all active strategies
 *                 winRate:
 *                   type: number
 *                   description: Average win_rate for all active strategies
 *       401:
 *         description: Unauthorized
 *
 * /api/strategy-instance/stats/{machineId}:
 *   get:
 *     summary: Get statistics about strategies for a specific machine
 *     tags: [StrategyInstance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the machine
 *     responses:
 *       200:
 *         description: Statistics about active strategies for the given machine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalActiveStrategies:
 *                   type: integer
 *                   description: Number of strategies with ACTIVE status for this machine
 *                 totalProfit:
 *                   type: number
 *                   description: Sum of total_profit_loss for all active strategies for this machine
 *                 winRate:
 *                   type: number
 *                   description: Average win_rate for all active strategies for this machine
 *                 totalTrades:
 *                   type: integer
 *                   description: Sum of total_trades_number for all active strategies for this machine
 *       401:
 *         description: Unauthorized
 *
 * /api/strategy-instance/by-machine/{machineId}:
 *   get:
 *     summary: Get all strategy instances for a specific machine
 *     tags: [StrategyInstance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the machine
 *     responses:
 *       200:
 *         description: List of strategy instances for the given machine
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StrategyInstance'
 *       401:
 *         description: Unauthorized
 *
 * components:
 *   schemas:
 *     StrategyInstance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         strategy_name:
 *           type: string
 *         opening_time:
 *           type: string
 *         closing_time:
 *           type: string
 *         total_profit_loss:
 *           type: number
 *         status:
 *           type: string
 *         total_trades_number:
 *           type: integer
 *         win_rate:
 *           type: number
 *         machine_id:
 *           type: integer
 *         last_activity:
 *           type: string
 *     StrategyInstanceInput:
 *       type: object
 *       properties:
 *         strategy_name:
 *           type: string
 *         opening_time:
 *           type: string
 *         closing_time:
 *           type: string
 *         total_profit_loss:
 *           type: number
 *         status:
 *           type: string
 *         total_trades_number:
 *           type: integer
 *         win_rate:
 *           type: number
 *         machine_id:
 *           type: integer
 *         last_activity:
 *           type: string
 *       required:
 *         - strategy_name
 *         - machine_id
 */
const express = require("express");
const strategyInstanceController = require("../controllers/strategyInstanceController");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

// Stats endpoint (protected)
router.get("/stats", strategyInstanceController.getStats);

// Stats by machine endpoint (protected)
router.get("/stats/:machineId", strategyInstanceController.getStatsByMachineId);

// Get all strategy instances by machine id (protected)
router.get(
  "/by-machine/:machineId",
  strategyInstanceController.getStrategyInstancesByMachineId
);

router.use(authenticateToken);

router.get("/", strategyInstanceController.getAllStrategyInstances);
router.get("/:id", strategyInstanceController.getStrategyInstanceById);
router.post("/", strategyInstanceController.createStrategyInstance);
router.put("/:id", strategyInstanceController.updateStrategyInstance);
router.delete("/:id", strategyInstanceController.deleteStrategyInstance);

module.exports = router;
