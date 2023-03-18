import { RequestHandler } from 'express'

export const Status: RequestHandler = async (_req, res) => {
  res.json({
    status: 'ok'
  })
}
