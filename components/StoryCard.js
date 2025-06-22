// import Link from 'next/link'

// export default function StoryCard({ story }) {
//   return (
//     <div className="bg-white shadow p-4 rounded-md hover:shadow-lg transition">
//       <h2 className="text-xl font-semibold text-purple-800">{story.title}</h2>
//       <p className="text-sm text-gray-600 mb-2">By {story.authorName}</p>
//       <p className="text-gray-700 line-clamp-3">{story.content.substring(0,50)}...</p>
//       <Link href={`/story/${story._id}`} className="text-purple-600 text-sm font-medium mt-2 inline-block">
//         Read More →
//       </Link>
//     </div>
//   )
// }

// components/StoryCard.js
import { useState,useEffect,useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function StoryCard({ story }) {
  const [likes, setLikes] = useState(story.likes || 0)
  const [liked, setLiked] = useState()
  const [views, setViews] = useState(story.views || 0)
  const [viewed, setViewed] = useState()

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && story.likedUsers.includes(user.email)) {
    setLiked(true)
  }
}, [story])


const handleLike = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) return alert('Please login to like the story.')

  const res = await fetch(`/api/stories/${story._id}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email }),
  })

  if (res.ok) {
    const data = await res.json()
    setLikes(data.likes)
    setLiked(data.liked)
  }
}

const handleView = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user || !user.email) {
  console.warn('User not found in localStorage.')
  return
 }

  const res = await fetch(`/api/stories/${story._id}/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email }),
  })

  if (res.ok) {
    const data = await res.json()
    setViews(data.views)
    setViewed(data.viewed)
  }
}

  return (
    <div className="bg-white shadow p-4 rounded-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-purple-800">{story.title}</h2>
      <p className="text-sm text-gray-600 mb-2">By {story.authorName}</p>
      <p className="text-gray-700 mb-2"> {story.content.substring(0, 60)}... </p>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex gap-4">
          <button onClick={handleLike} className="hover:text-purple-700 cursor-pointer"><span style={{ filter: 'drop-shadow(0px 1px 1px black)' }}>{liked ? '❤️' : '🤍'}</span> {likes}</button> 
          <span>👁️ {story.views}</span>
        </div>
        <Link onClick={handleView} href={`/story/${story._id}`} className="text-purple-600 font-medium">
          Read More →
        </Link>
      </div>
    </div>
  )
}
