import express from "express";
const router = express.Router();
import { getDataModels, updateDataModels, patchDataModels } from "../models/index.js"

router.get("/", async function(req, res) {
    const result = await getDataModels()
    return res.json({success: true, payload: result})
})

router.post("/", async function(req,res) {
    const result = await updateDataModels(req.body)
    return res.json({success: true, payload: result}) 
})

router.patch("/:id", async function(req,res) {
    const result = await patchDataModels(req.body, req.params.id)
    console.log(result)
    return res.json({success: true, payload: result}) 
    
})

export default router