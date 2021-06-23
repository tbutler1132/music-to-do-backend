import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {createRequire} from 'module'
import morgan from 'morgan'
const require = createRequire(import.meta.url);

import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'
import {authenticateToken} from './routes/auth.js'

require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(morgan('dev'))

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//PROXY ENDPOINTS

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

const CONNECTION_URL = 'mongodb://tbutler:1132@tbutler1132-mongo-todo-production/admin'

const PORT = process.env.PORT|| 7000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('I a running')
})


mongoose.set('useFindAndModify', false);