import {pool} from "../db/index.js"

export async function getDataModelsByEmail (email){
    const subjectArray = await pool.query ("SELECT * FROM progressCheck WHERE email=$1 ORDER BY id ASC", [email])
    return subjectArray.rows
}

export async function updateDataModels (data){
    const subjectArray = await pool.query (`INSERT INTO progressCheck (user_id, day, subject, email) VALUES (1, $1, $2, $3) RETURNING*`, [data.day, data.subject, data.email])
    return subjectArray
}
export async function editButtonModels (data, id){
    const subjectArray = await pool.query (`UPDATE progressCheck SET day=$1, subject=$2 WHERE id=$3 RETURNING*`, [data.day, data.subject, id])
    return subjectArray.rows
}

