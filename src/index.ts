//write a function to create users table in your database
import { error } from "console";
import { Client } from "pg";
import { configDotenv } from 'dotenv'

configDotenv()

// const client = new Client({
//     host:'',
//     port:5334,
//     database:'test',
//     password:'5TdlAxfFgC9n'
// })
const client = new Client({
    connectionString: process.env.URL
})

//Create table
const createUsersTable = async () => {

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

//Insert data
const insertData = async (username: string, email: string, password: string) => {

    //SQL Injection issue for this code:
    // try{
    //     await client.connect()
    //     const insertQuery = `INSERT INTO users (username,email,password)
    //                                     VALUES('Sameer69','sameermarathe69@gmail.com','Sameer@2003')`
    //     const res = await client.query(insertQuery)
    //     console.log("Insertion successful ",res)
    // }catch(err){
    //     console.error('Error during insertion ',err)

    // }finally{
    //     await client.end()
    // }

    //Solution::
    try {
        await client.connect()
        // Use parameterized query to prevent SQL injection
        const insertQuery = `INSERT INTO users(username,email,password) VALUES($1,$2,$3)`
        const values = [username, email, password]
        const res = await client.query(insertQuery, values)
        console.log('Insertion success:', res); // Output insertion result


    } catch (error) {
        console.error(error)
    } finally {
        await client.end()
    }

}

//getuser
const getUser = async(email:string)=>{
    try{
        await client.connect()
        const query = `SELECT * FROM users WHERE email=$1`
        const values = [email]
        const result = await client.query(query,values)
        
        if(result.rows.length > 0){
            console.log("User found",result.rows[0])
            return result.rows[0]
        }
        else {
            console.log('No user found with the given email.');
            return null; // Return null if no user was found
          }
        } catch (err) {
          console.error('Error during fetching user:', err);
          throw err; // Rethrow or handle error appropriately
        } finally {
          await client.end(); // Close the client connection
        }


}


// createUsersTable()
// insertData()
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);
getUser('sameermarathe15@gmail.com')

