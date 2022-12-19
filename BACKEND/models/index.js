import {pool} from "../db/index.js"

export async function getDataModelsByEmail (email){
    const subjectArray = await pool.query ("SELECT * FROM progressCheck WHERE email=$1 ORDER BY id ASC", [email])
    return subjectArray.rows
}

export async function updateDataModels (data){
    const subjectArray = await pool.query (`INSERT INTO progressCheck (user_id, day, subject) VALUES (1, $1, $2)`, [data.day, data.subject])
    return subjectArray
}
export async function editButtonModels (data, id){
    const subjectArray = await pool.query (`UPDATE progressCheck SET day=$1, subject=$2 WHERE id=$3`, [data.day, data.subject, id])
    return subjectArray.rows
}

