// pages/api/stories/[id]/view.js
// import dbConnect from '@/lib/mongodb'
// import Story from '@/models/Story'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end()

//   const { id } = req.query
//   const { email } = req.body // or userId if you're storing that

//   await dbConnect()

//   const story = await Story.findById(id)
//   if (!story) return res.status(404).json({ error: 'Story not found' })

//   const hasViewed = story.viewedUsers.includes(email)

//   if (hasViewed) {
//     story.viewedUsers = story.viewedUsers.filter(user => user !== email)
//   } else {
//     story.views += 1
//     story.viewedUsers.push(email)
//   }

//   await story.save()

//   res.status(200).json({ views: story.views, viewed: hasViewed })
// }

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

  let viewed = false

  if (!story.viewedUsers.includes(email)) {
    story.viewedUsers.push(email)
    story.views += 1
    viewed = true
  }

  await story.save()

  return res.status(200).json({ success: true, views: story.views, viewed })
}
