import query from "../db/index"

export async function getDataModels (){
    const subjectArray = await query ("SELECT * FROM codingprogress")
    return subjectArray
}

