import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import Routes from './routes/index'

class App {
    public express: Application;
    public port: number;
    private DB_URL: string;
    constructor(port: number, DB_URL: string) {
        this.express = express()
        this.port = port;
        this.DB_URL = DB_URL
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling()
    }
    private initializeDatabaseConnection(): void {

        mongoose.connect(this.DB_URL)

        mongoose.connection.on('connected', () => {
            console.log('Connected to database ');
        });

        mongoose.connection.on('error', (err) => {
            console.log('Database error: ' + err)
        });
    }
    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(bodyParser.json({ limit: '20mb' }))
        this.express.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
    }
    private initializeRoutes(): void {
        new Routes(this.express)
    }
    private initializeErrorHandling(): void {
        /* this.express.use(ErrorMiddleware()) */
    }

    public listen(): void {
        this.express.listen(this.port, (): void => {
            console.clear()
            console.log(`Server is running at ${this.port}`)
        })

    }
}

export default App