import * as mongoose from 'mongoose'
import { environment } from '../config'

let db;

export const initDb = async () => {
  db = await mongoose.connect(environment.databaseUrl)
  return db
}