import dbConnect from '../../../lib/mongodb'
import Story from '../../../models/Story'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid story ID' })
  }

  if (req.method === 'PUT') {
  const { title, content } = req.body
  try {
    const updated = await Story.findByIdAndUpdate(id, { title, content }, { new: true })
    return res.status(200).json({ message: 'Story updated', story: updated })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update' })
  }
}

  if (req.method === 'GET') {
    const story = await Story.findById(id)
    if (!story) return res.status(404).json({ error: 'Story not found' })
    return res.status(200).json({ story })
  }


  if (req.method === 'DELETE') {
    try {
      await Story.findByIdAndDelete(id)
      return res.status(200).json({ message: 'Story deleted' })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete' })
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
  
  try {
    const story = await Story.findById(id)
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }
    
    await story.save()

    return res.status(200).json({ story })

  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
