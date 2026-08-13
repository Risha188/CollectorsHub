import {Heart, MessageCircle, Bookmark} from "lucide-react"
import type { CommunityPost } from "../../types/community.ts"
import { useCommunity } from "../../context/CommunityContext.tsx";
import { Link } from "react-router-dom";

interface PostCardProps {
    post: CommunityPost;
}

const PostCard = ({post}: PostCardProps) => {
    const {toggleLike, toggleSave, isLiked, isSaved} = useCommunity();

    const liked = isLiked(post.id);
    const saved = isSaved(post.id);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* User Information */}
        <div className="flex items-center gap-3 p-4">
            <img 
            src={post.userAvatar}
            alt={post.userName}
            className="h-11 w-11 rounded-full object-cover"
            />
            <div>
                <h3 className="font-semibold text-gray-900">
                    {post.userName}
                </h3>
                <p className="text-sm text-gray-500">
                    {post.category}
                </p>
            </div>
        </div>

        {/* Post Image */}
        <div className="h-72 bg-gray-100 sm:h-80">
            <Link to={`/community/${post.id}`}>
                <img
            src={post.image} 
            alt={post.caption}
            className="h-full w-full object-cover"
            />
            </Link>
            
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-5">

                <button
                onClick={()=> toggleLike(post.id)}
                className="flex items-center gap-2 text-gray-600 transition hover:text-red-500"
                aria-label="Like Post"
                >
                    <Heart size={21} className={liked ? "fill-red-500 text-red-500" : "text-gray-600"} />
                    <span className="text-sm">
                        {post.likes + (liked ? 1 : 0)}
                    </span>
                </button>

                <button
                className="flex items-center gap-2 text-gray-600 transition hover:text-blue-500"
                aria-label="View comments"
                >
                    <MessageCircle size={21} />
                    <span className="text-sm">
                        {post.comments}
                    </span>
                </button>
            </div>

            <button
            onClick={()=> toggleSave(post.id)}
            className="text-gray-600 transition hover:text-blue-500"
            aria-label="Save post"
            >
                <Bookmark size={21} className={saved ? "fill-blue-600 text-blue-600" : "text-gray-600"} />
            </button>
        </div>

        {/* Caption */}
        <div className="p-4">
            <p className="text-gray-700 text-sm leading-6">
                <span className="mr-1 font-semibold text-gray-900">
                    {post.userName}
                </span>
                {post.caption}
            </p>

            <p className="mt-3 text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("en-IN")}
            </p>
        </div>
      
    </article>
  )
}

export default PostCard;
