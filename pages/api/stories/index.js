import dbConnect from '@/lib/mongodb'
import Story from '@/models/Story'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    try {
      const story = await Story.create(req.body)
      res.status(201).json({ success: true, data: story })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  } else if (req.method === 'GET') {
    try {
      const stories = await Story.find().sort({ createdAt: -1 })
      res.status(200).json({ success: true, data: stories })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' })
  }
}
