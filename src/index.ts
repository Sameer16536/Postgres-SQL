//write a function to create users table in your database
import { error } from "console";
import { Client } from "pg";
import  {configDotenv}from 'dotenv'
 
configDotenv()

// const client = new Client({
//     host:'',
//     port:5334,
//     database:'test',
//     password:'5TdlAxfFgC9n'
// })
const client = new Client({
    connectionString:process.env.URL
})

const createUsersTable = async()=>{
   
        await client.connect();
        const result = client.query(`
            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`)
   
  console.log(result)
}

createUsersTable()