const router = require('express').Router()


const auth = require('./auth')
// const board = require('./board')
// const section = require('./section')
// const task = require('./task')

router.use('/auth', auth)
// router.use('/board', board)
// router.use('/board/:boardId/section', section)
// router.use('/board/:boardId/task', task)

module.exports  = router