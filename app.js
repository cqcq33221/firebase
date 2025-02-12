require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin with Service Account
const serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix multiline issue
  client_email: process.env.CLIENT_EMAIL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`
});

// Example Route
app.get("/", (req, res) => {
  res.send("🚀 Firebase Backend Running on Railway!");
});

// Start Server on Railway Assigned Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
