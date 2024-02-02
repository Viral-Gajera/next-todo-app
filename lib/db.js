import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

export default async function query(query, value = []) {
    const [results] = await pool.execute(query, value);
    return results;

    /*
        Return 
        SELECT -> array of object
        INSERT -> InsertId, affectedRows
        UPDATE -> affectedRows
        DELETE -> affectedRows
    */
}
