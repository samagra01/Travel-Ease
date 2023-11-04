const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Bus = require("../models/busModel")
// add bus

router.post('/add-bus',authMiddleware,async(req,res) => {
    try {
        const existingBus = await Bus.findOne({number : req.body.number});
        if(existingBus){
            return res.status(200).send({
                success: false,
                message: "Bus already exists",
            })
        }
        // console.log(req.body);
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: "Bus added successfully",
        })
    } catch (error) {
        res.status(200).send({
            success: false,
            message: error.message,
        })
    }
}) 

router.post("/update-bus" , authMiddleware , async(req,res) => {
    try {
        await Bus.findByIdAndUpdate(req.body._id,req.body);
        return res.status(200).send({
            success: true,
            message: "Bus updated successfully",
        })
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}) 

router.post("/delete-bus",authMiddleware,async(req,res) => {
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus delete successfully",
        })
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    } 
})

router.post("/get-all-buses", async(req,res) => {
    try {
        // console.log(req.body);
        const buses = await Bus.find(req.body);
        // console.log(buses);
        return res.status(200).send({
            success: true,
            message: "Buses fetched successsfully",
            data: buses,
        })
    } catch (error) {
        res.status(500).send({success:false,message: error.message});
    }
})

router.post("/get-bus-by-id",authMiddleware,async(req,res)=>{
    try {
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus fetched successfully",
            data : bus,
        })
    } catch (error) {
        res.status(500).send({success: false,message: error.message});        
    }
})  

module.exports = router;