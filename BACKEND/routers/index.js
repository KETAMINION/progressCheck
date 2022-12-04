import express from "express";
const router = express.Router();
import { getDataModels } from "../models/index.js"

router.get("/", async function(req, res) {
    const result = await getDataModels()
    return res.json({success: true, payload: result})
})

export default router