import express from 'express'
import { commandDispatcher } from './modules/commandDispatcher'
import { getConfig } from './modules/config'

const port = getConfig().ENDPOINT_PORT

const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
  try {
    const response = await commandDispatcher(req.body)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      reason: error.message,
    })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
