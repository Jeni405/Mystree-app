import mongoose from 'mongoose'

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  likedUsers: { type: [String], default: [] },
  viewedUsers: { type: [String], default: [] }
}, { timestamps: true})

export default mongoose.models.Story || mongoose.model('Story', StorySchema)
