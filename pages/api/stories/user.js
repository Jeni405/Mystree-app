import dbConnect from '@/lib/mongodb'
import Story from '@/models/Story'

export default async function handler(req, res) {
  const { authorName } = req.query

  if (!authorName) return res.status(400).json({ error: 'Author name required' })

  await dbConnect()
  const stories = await Story.find({ authorName }).sort({ createdAt: -1 })

  res.status(200).json({ stories })
}
