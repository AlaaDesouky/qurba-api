import * as express from 'express'
import { environment } from './config'

export default class App {
  constructor(private app) {
    this.app = express()
    this.app.use(express.json())
  }

  getApp() {
    return this.app
  }

  listen() {
    const { port } = environment
    this.app.listen(port, () => console.log(`Listening on port ${port}`))
  }
}