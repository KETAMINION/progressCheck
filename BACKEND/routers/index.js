import express from "express";
const router = express.Router();
import { getDataModels, updateDataModels } from "../models/index.js"

router.get("/", async function(req, res) {
    const result = await getDataModels()
    return res.json({success: true, payload: result})
})

router.post("/", async function(req,res) {
    const result = await updateDataModels(req.body)
    return res.json({success: true, payload: result}) 
})


export default router