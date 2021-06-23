import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import {createRequire} from 'module'
const require = createRequire(import.meta.url);

import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'

require('dotenv').config()

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

const CONNECTION_URL = 'mongodb://tbutler:1132@tbutler1132-mongo-todo-production/admin'

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);