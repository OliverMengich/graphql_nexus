import { Db, db } from "./data/db";
import {DbClient} from "./data/DbClient";
export interface Context{
    // db: Db
    db: DbClient
}
export const context = {
    db
}