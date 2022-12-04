import { query } from "express"

export async function getDataModels (){
    const subjectArray = await query ("SELECT * FROM codingprogress")
    return subjectArray
}

