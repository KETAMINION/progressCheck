import express, { application } from "express";
const router = express.Router();
import { getDataModels } from "../models/index";

router.get("/", async function(req, res) {
    const result = await getDataModels()
    return res.json({success: true, payload: result})
})

export default router