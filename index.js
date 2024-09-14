//APP.js

const express = require("express")
const cors = require("cors")
const path = require('path');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const LoginData = require("./LoginData")
const RegisterData=require("./RegisterData")
const Workerregister=require("./Workerregister")
const Data=require("./Data");
const profileData  = require("./Profiledata");
app.get("/",(req,res)=>{
    res.send("hello from server")
})
        ///signup....server
         app.post("/signup", async (req, res) => {
        const { email, password, fname,lname} = req.body
    
        const data = {
            email: email,
            password: password,
            fname: fname,
            lname:lname
        }
        const check=await RegisterData(data);
           
            if (check) {
                res.json("exist")
            }
            else {
                res.json("notexit")
               
            }
    })
    //login server....
    app.post("/login", async (req, res) => {
        const { email, password } = req.body
        const check=await LoginData(email,password);
            if (check) {
                res.json("exist")
            }
            else {
                res.json("notexist")
            }
    
    })
    
    // worker register
    app.post("/register", async (req, res) => {
        const { email, password, fname, lname, skills,contact} = req.body
    
        const data = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            skills: skills,
            contact: contact
        }
        const check=await Workerregister(data);
           
            if (check) {
                res.json("exist")
            }
            else {
                res.json("notexit")
               
            }
    })

    app.get("/profile", async (req, res) => {
        const username = req.query.username; // Get username from query params
        const userProfile = await profiledata(username);
        res.json(userProfile);
    });
    // retrieve data
    app.post('/api/categories', async (req, res) => {
        try {
            const { name } = req.body; // Extract 'name' from the request body
    
    
            // Fetch category data
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
      
    

app.listen(8000, () => {
    console.log("port connected");
})
