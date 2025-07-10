const mongoose = require("mongoose");
const User = require("../models/User");
const authService = require("../services/authService");
const StrategyInstance = require("../models/StrategyInstance");

const uri = "mongodb+srv://kamel:kamel@cluster0.wejj0ir.mongodb.net/forex_saga";

async function seedAdmin() {
  await mongoose.connect(uri);
  const adminExists = await User.findOne({ username: "admin" });
  if (!adminExists) {
    const hashedPassword = await authService.hashPassword("admin123");
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created.");
  } else {
    console.log("Admin user already exists.");
  }
  await mongoose.disconnect();
}

async function seedStrategyInstance() {
  await mongoose.connect(uri);
  await StrategyInstance.create({
    strategy_name: "Fake Strategy",
    opening_time: new Date().toISOString(),
    closing_time: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour later
    total_profit_loss: 1234.56,
    status: "ACTIVE",
    total_trades_number: 42,
    win_rate: 0.75,
    machine_id: "686a8d7b98620860c0abfb37",
    last_activity: new Date().toISOString(),
  });
  console.log("Fake strategy instance created.");
  await mongoose.disconnect();
}

// seedStrategyInstance();
