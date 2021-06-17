import express from 'express'

import {getTasks} from '../controllers/tasks.js'
import {createTask} from '../controllers/tasks.js'

const router = express.Router()

router.get('/', getTasks)
router.post('/', createTask)

export default router