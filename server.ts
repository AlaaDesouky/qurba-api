import './config/dotenv.config'
import { initDb } from './datastore'

(async () => {
  try {
    // Connect to database
    await initDb()
    console.log('DB connected successfully')

    // Initialize new express app
    const App = require('./app').default
    const app = new App()
    app.listen()
  } catch (error) {
    console.log('Something went wrong when initializing the app:\n', error.stack)
  }
})()