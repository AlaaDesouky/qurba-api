import * as express from 'express'
import v1Router from './routes/v1'
import { environment } from './config'

export default class App {
  constructor(private app) {
    this.app = express()
    this.app.use(express.json())
    this.setRoutes()
  }

  // Setting up the router
  setRoutes() {
    this.app.use('/api/v1', v1Router)
  }

  getApp() {
    return this.app
  }

  listen() {
    const { port } = environment
    this.app.listen(port, () => console.log(`Listening on port ${port}`))
  }
}