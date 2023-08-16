import pg from "pg";
const Pool = pg.Pool;
import {v4 as uuid} from "uuid";

const pool = new Pool({
  user: 'jpuseche',
  host: 'postgres://jpuseche:VPKiS7bmTwIPdxffhxvKvv4HZzyogrZC@dpg-cjeib86nk9qs73bsadgg-a/adventure_inventory',
  database: 'adventure_inventory',
  password: 'VPKiS7bmTwIPdxffhxvKvv4HZzyogrZC@dpg-cjeib86nk9qs73bsadgg-a',
  port: 5432,
});

const tool = {};

tool.getTools = () => {
    return new Promise(function(resolve, reject) {
        pool.query("SELECT * FROM tool;", (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

tool.createTool = (body) => {
    return new Promise(function(resolve, reject) {
        let toolId = uuid()
        const { name, imageSrc, amount, price, totalPrice } = body
        pool.query("INSERT INTO tool (id, name, image_src, amount, price, total_price) VALUES ($1, $2, $3, $4, $5, $6);", [toolId, name, imageSrc, amount, price, totalPrice], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
            console.log(`Added tool with id: ${toolId}`);
        })
    })
}

tool.deleteTool = (id) => {
    return new Promise(function(resolve, reject){
        pool.query("DELETE FROM tool WHERE id = $1;", [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
            console.log(`Deleted tool with id: ${id}`);
        })
    })
}

export default tool