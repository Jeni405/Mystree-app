// pages/story/[id].js
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

export default function StoryPage() {
  const router = useRouter()
  const { id } = router.query
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [views, setViews] = useState(0)

  useEffect(() => {
    if (!id) return

    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/stories/${id}`)
        const data = await res.json()
        if (res.ok) {
          setStory(data.story)
          setViews(data.story.views)
        } else {
          console.error('Error loading story:', data.message)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchStory()
  }, [id])


  if (loading) return <p>Loading...</p>
  if (!story) return <p>Story not found</p>

  return (
    <div className="w-full mx-auto mt-20 md:mt-24 py-5 px-6 bg-gray-300">
      <h1 className="text-2xl text-gray-900 text-center font-bold mb-6">{story.title}</h1>
      <p className="text-gray-800 whitespace-pre-line">{story.content}</p>
      <p className="mt-4 text-right text-sm text-gray-600">By: {story.authorName || 'Anonymous'}</p>
    </div>
  )
}
