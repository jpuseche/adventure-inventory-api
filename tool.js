import pool from "./db_pool.js";
import {v4 as uuid} from "uuid";

const tool = {};

tool.get = () => {
    return new Promise(function(resolve, reject) {
        pool.query("SELECT * FROM tool;", (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            console.log(process.env.PGDATABASE);
            console.log(`tool.get() returned ${results.rows.length} rows`)
            resolve(results.rows);
        })
    })
}

tool.create = (body) => {
    return new Promise(function(resolve, reject) {
        let toolId = uuid()
        const { name, imageSrc, amount, price, totalPrice } = body
        pool.query("INSERT INTO tool (id, name, image_src, amount, price, total_price) VALUES ($1, $2, $3, $4, $5, $6);", [toolId, name, imageSrc, amount, price, totalPrice], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(results.rows[0]);
            console.log(`Executed tool.create(); Added tool with id: ${toolId}`);
        })
    })
}

tool.delete = (id) => {
    return new Promise(function(resolve, reject){
        pool.query("DELETE FROM tool WHERE id = $1;", [id], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(results.rows[0]);
            console.log(`Executed tool.delete(); Deleted tool with id: ${id}`);
        })
    })
}

export default tool