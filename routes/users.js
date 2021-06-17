import express from 'express'

import {getUsers} from '../controllers/users.js'
import {createUsers} from '../controllers/users.js'


const router = express.Router()

router.get('/', getUsers)
router.post('/', createUsers)


export default router