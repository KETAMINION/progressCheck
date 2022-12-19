import express from "express";
const router = express.Router();
import { getDataModelsByEmail, updateDataModels, editButtonModels } from "../models/index.js"

router.get("/", async function(req, res) {
    const result = await getDataModelsByEmail(req.query.email)
    return res.json({success: true, payload: result})
})

router.post("/", async function(req,res) {
    const result = await updateDataModels(req.body)
    return res.json({success: true, payload: result}) 
})

router.patch("/:id", async function(req,res) {
    const result = await editButtonModels(req.body, req.params.id)
    return res.json({success: true, payload: result}) 
})

export default router