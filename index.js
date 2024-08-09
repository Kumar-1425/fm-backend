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
const AgriData=require("./AgriData");
const BeautyData=require('./BeautyData');
const BabyData = require("./BabyData");
const CatersData = require("./CatersData");
const DailyNeeds = require("./DailyNeeds");
const DrivingSchoolsData = require("./DrivingSchoolsData");
const EventOrganisers = require("./EventOrganisers");
const EducationData = require("./EducationData");
const GymData = require("./GymData");
const HospitalData = require("./HospitalData");
const HomeDecorData = require("./HomeDecorData");
const HKServiceData = require("./HKServiceData");
const HotelsData = require("./HotelsData");
const HostelsData = require("./HostelsData");
const SecurityData = require("./SecurityData");
const RepairData = require("./RepairData");
const profileData  = require("./profiledata");
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
    //retreiving data.....
    app.get("/list", async (req, res) => {
        const check=await AgriData();
            res.json(check);
    
    })
    app.get("/blist",async(req,res)=>{
        const check = await BeautyData();
        res.json(check);
    })
    app.get("/babylist", async(req,res)=>{
        const check = await BabyData();
        res.json(check);
    })
    app.get("/clist", async(req,res)=>{
        const check = await CatersData();
        res.json(check);
    })
    app.get("/consultlist", async(req,res)=>{
        const check = await ConsultantData();
        res.json(check);
    })
    app.get("/contractlist", async(req,res)=>{
        const check = await ContractorsData();
        res.json(check);
    })
    app.get("/courierslist", async(req,res)=>{
        const check = await CouriersData();
        res.json(check);
    })
    app.get("/needs", async(req,res)=>{
        const check = await DailyNeeds();
        res.json(check);
    })
    app.get("/dsdata", async(req,res)=>{
        const check= await DrivingSchoolsData();
        res.json(check);
    })
    app.get("/events", async(req,res)=>{
        const check = await EventOrganisers();
        res.json(check);
    })
    app.get("/edata", async(req,res)=>{
        const check = await EducationData();
        res.json(check);
    })
    app.get("/gdata", async(req,res)=>{
        const check = await GymData();
        res.json(check);
    })
    app.get("/hdata", async(req,res)=>{
        const check = await HospitalData();
        res.json(check);
    })
    app.get("/decordata", async(req,res)=>{
        const check = await HomeDecorData();
        res.json(check);
    })
    app.get("/hksdata", async(req,res)=>{
        const check = await HKServiceData();
        res.json(check);
    })
    app.get("/hostels", async(req,res)=>{
        const check = await HostelsData();
        res.json(check);
    })
    app.get("/hotels", async(req,res)=>{
        const check = await HotelsData();
        res.json(check);
    })
    app.get("/security", async(req,res)=>{
        const check = await SecurityData();
        res.json(check);
    })
    app.get("/repair", async(req,res)=>{
        const check = await RepairData();
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

    app.get("/profile", async (req, res) => {
        const username = req.query.username; // Get username from query params
        const userProfile = await profileData(username);
        console.log(userProfile)
        res.json(userProfile);
    });
    

app.listen(8000, () => {
    console.log("port connected");
})

