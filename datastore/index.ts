import * as mongoose from 'mongoose'
import { environment } from '../config'

export const initDb = async () => {
  return await mongoose.connect(environment.databaseUrl)
}