// pages/api/stories/[id]/like.js
import dbConnect from '@/lib/mongodb'
import Story from '@/models/Story'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { id } = req.query
  const { email } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  await dbConnect()

  const story = await Story.findById(id)
  if (!story) return res.status(404).json({ error: 'Story not found' })

  let liked = false

  if (story.likedUsers.includes(email)) {
    // Unlike
    story.likedUsers = story.likedUsers.filter(user => user !== email)
    story.likes -= 1
  } else {
    // Like
    story.likedUsers.push(email)
    story.likes += 1
    liked = true
  }

  await story.save()

  return res.status(200).json({ success: true, likes: story.likes, liked })
}
