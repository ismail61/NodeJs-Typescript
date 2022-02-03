import 'dotenv/config'
import App from './api/app'

const app = new App(Number(process.env.PORT),String(process.env.URL))

app.listen()