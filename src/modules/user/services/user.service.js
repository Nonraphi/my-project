import { doQuery} from "../../../common/database/mysql.db.js";
import { UserModels, TableName } from '../model/user.schema.js'
const UserService = {
    createUser: (payload) =>{
        return doQuery(`INSERT INTO ${TableName} SET ?`,payload)
    },
    getUserAll: (columns = Object.keys(UserModels)) => {
        const options = [columns, TableName];
        return doQuery(`SELECT ?? FROM ??`, options);
    },
    getUserById:(id = {})=>{
        const sql = `SELECT * FROM ${TableName} WHERE id = ?`; 
        const options = [id];
        return doQuery(sql, options);
    },
    getUserByName: (u_name = "") => {   
        const sql = `SELECT * FROM ${TableName} WHERE LOWER(u_name) = LOWER(?)`;  
        const options = [u_name];
        return doQuery(sql, options);
    },
    updateOneUserById : (id,payload)=>{
        let setClause = '';
        const values = [];

        for (const [key, value] of Object.entries(payload)) {
            setClause += `${key} = ?, `;
            values.push(value);
        }
        
        setClause = setClause.slice(0, -2);
        console.log(setClause)
        values.push(id);
        console.log( values)
        const sql = `UPDATE ${TableName} SET ${setClause} WHERE id = ?`;

        return doQuery (sql, values);    
    },deleteUserById:(id = {})=>{
        const sql = `DELETE FROM ${TableName} WHERE id = ?`;

        return doQuery(sql, [id]);
    }
}    

export default UserService