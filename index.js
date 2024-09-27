const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Replace with your Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Replace with your Twilio auth token
const client = twilio(accountSid, authToken);

// Configure CORS for specific origins
const corsOptions = {
  origin: 'https://7wjyqz.csb.app',  // Replace with your frontend URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Dummy data imports (replace these with actual data handling logic)
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

// Worker registration
app.post("/register", async (req, res) => {
    const { email, password, fname, lname, skills, contact } = req.body;
    const data = { fname, lname, email, password, skills, contact };
    const check = await Workerregister(data);
    res.json(check ? "exist" : "notexit");
});

// Profile route
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

// Call worker route
app.post("/api/call", async (req, res) => {
    const { to } = req.body;  // 'to' is the worker's phone number
    
    try {
        // Initiate a call via Twilio
        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',  // Twilio will hit this URL when the call is answered
            to: to,  // The worker's phone number from the request
            from: '+16507708223' // Your Twilio phone number (must be a string)
        });
        
        console.log(`Call initiated with SID: ${call.sid}`);
        res.json({ success: true, message: "Call initiated", callSid: call.sid });
    } catch (error) {
        console.error("Error making the call:", error);
        res.status(500).json({ success: false, message: "Failed to make the call", error: error.message });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
