import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import taskRoutes from './routes/tasks.js'
import userRoutes from './routes/users.js'

const app = express();


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = 'mongodb+srv://tbutler1132:1234@cluster0.jckqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT|| 7000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('I a running')
})

mongoose.set('useFindAndModify', false);