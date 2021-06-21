import express from 'express'

import {getUsers} from '../controllers/users.js'
import {createUsers} from '../controllers/users.js'
import {addGeneralTask} from '../controllers/users.js'
import {deleteGeneralTask} from '../controllers/users.js'
import {addSong} from '../controllers/users.js'
import {deleteSong} from '../controllers/users.js'
import {addSongTask} from '../controllers/users.js'
import {deleteSongTask} from '../controllers/users.js'


const router = express.Router()

router.get('/', getUsers)
router.post('/', createUsers)
router.patch('/add_gen_task/:id', addGeneralTask)
router.delete('/delete_gen_task/:id', deleteGeneralTask)
router.patch('/add_song/:id', addSong)
router.delete('/delete_song/:id', deleteSong)
router.patch('/add_song_task/:id', addSongTask)
router.delete('/delete_song_task/:id', deleteSongTask)

export default router