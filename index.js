const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS for specific origins (optional)
const corsOptions = {
  origin: 'https://7wjyqz.csb.app',  // Allow your frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // Use CORS middleware

// Dummy data import (add your actual data handling code here)
const LoginData = require("./LoginData");
const RegisterData = require("./RegisterData");
const Workerregister = require("./Workerregister");
const Data = require("./Data");
const ProfileData = require("./ProfileData");

// Routes

app.get("/", (req, res) => {
    res.send("Hello from server");
});

// Signup route
app.post("/signup", async (req, res) => {
    const { email, password, fname, lname } = req.body;
    const data = { email, password, fname, lname };
    const check = await RegisterData(data);
    res.json(check ? "exist" : "notexit");
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const check = await LoginData(email, password);
    res.json(check ? "exist" : "notexist");
});

// Worker register
app.post("/register", async (req, res) => {
    const { email, password, fname, lname, skills, contact } = req.body;
    const data = { fname, lname, email, password, skills, contact };
    const check = await Workerregister(data);
    res.json(check ? "exist" : "notexit");
});

// Profile route (with CORS header manually added)
app.get("/profile", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Enable CORS for this route
    const username = req.query.username;
    const userProfile = await ProfileData(username);
    res.json(userProfile);
});

// Retrieve categories data
app.post('/api/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Data(name);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
