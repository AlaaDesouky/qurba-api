import './config/dotenv.config'

(async () => {
  try {
    // TODO: Connect to database

    // Initialize new express app
    const App = require('./app').default
    const app = new App()
    app.listen()
  } catch (error) {
    console.log('Something went wrong when initializing the app:\n', error.stack)
  }
})()