const express = require("express")
const cors = require("cors")
const path = require('path');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const LoginData = require("./LoginData")
const RegisterData=require(".RegisterData")
const Workerregister=require("./Workerregister")
const AgriData=require("./AgriData")
app.get("/",(req,res)=>{
    res.send("hello from server")
})
        ///signup....server
         app.post("/signup", async (req, res) => {
        const { email, password, name} = req.body
    
        const data = {
            email: email,
            password: password,
            name: name
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
    //retreiving data.....
    app.get("/list", async (req, res) => {
        const check=await AgriData();
            res.json(check);
    
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
app.listen(8000, () => {
    console.log("port connected");
})

