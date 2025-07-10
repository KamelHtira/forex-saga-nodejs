/**
 * @swagger
 * tags:
 *   name: Machine
 *   description: Machine management
 */

/**
 * @swagger
 * /api/machine:
 *   get:
 *     summary: Get all machines
 *     tags: [Machine]
 *     responses:
 *       200:
 *         description: List of machines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Machine'
 *   post:
 *     summary: Create a new machine
 *     tags: [Machine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MachineInput'
 *     responses:
 *       201:
 *         description: Machine created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *
 * /api/machine/{id}:
 *   get:
 *     summary: Get a machine by ID
 *     tags: [Machine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Machine ID
 *     responses:
 *       200:
 *         description: Machine found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       404:
 *         description: Machine not found
 *   put:
 *     summary: Update a machine
 *     tags: [Machine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Machine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MachineInput'
 *     responses:
 *       200:
 *         description: Machine updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       404:
 *         description: Machine not found
 *   delete:
 *     summary: Delete a machine
 *     tags: [Machine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Machine ID
 *     responses:
 *       200:
 *         description: Machine deleted
 *       404:
 *         description: Machine not found
 *
 * components:
 *   schemas:
 *     Machine:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         account_name:
 *           type: string
 *         total_strategy_instances_ran:
 *           type: integer
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     MachineInput:
 *       type: object
 *       properties:
 *         account_name:
 *           type: string
 *         total_strategy_instances_ran:
 *           type: integer
 *         status:
 *           type: string
 *       required:
 *         - account_name
 */
const express = require("express");
const machineController = require("../controllers/machineController");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.get("/",machineController.getAllMachines);
router.get("/:id", machineController.getMachineById);
router.post("/", machineController.createMachine);
router.put("/:id",machineController.updateMachine);
router.delete("/:id", machineController.deleteMachine);

module.exports = router;
