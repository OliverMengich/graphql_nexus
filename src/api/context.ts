import { Db, db } from "./data/db";
export interface Context{
    db: Db
}
export const context = {
    db
}