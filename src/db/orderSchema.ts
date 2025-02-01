
import {integer,varchar,pgTable, text, doublePrecision, timestamp} from "drizzle-orm/pg-core"
import { userTable } from "./userSchema.js"
import { productTable } from "./productSchema.js"

export const orderTable=pgTable('orders',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt:timestamp().notNull().defaultNow(),
    status:varchar({length:50}).notNull().default('New'),
    userId:integer().references(()=>userTable.id).notNull(),
    product:integer().references(()=>productTable.id).notNull(),
    price:integer().notNull()
})

