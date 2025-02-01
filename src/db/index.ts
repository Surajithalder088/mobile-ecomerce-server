// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
// You can specify any property from the node-postgres connection options
import pg from "pg"
import * as dotenv from "dotenv"
dotenv.config()
 const pool=new pg.Pool({
    connectionString:process.env.DATABASE_URL,
 })

 export const db=drizzle(pool)
