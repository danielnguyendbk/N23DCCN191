const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    if (process.env.MONGO_DNS_SERVERS) {
      const dnsServers = process.env.MONGO_DNS_SERVERS
        .split(",")
        .map((server) => server.trim());

      dns.setServers(dnsServers);
      console.log("Using DNS servers:", dnsServers);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;