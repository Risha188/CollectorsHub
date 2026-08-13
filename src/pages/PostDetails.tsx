import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  MessageCircle,
} from "lucide-react";

import { communityPosts } from "../data/communityPosts";
import { useCommunity } from "../context/CommunityContext";

const PostDetails = () => {
  const { id } = useParams();

  const post = communityPosts.find(
    (item) => item.id === Number(id)
  );

  const {
    toggleLike,
    toggleSave,
    isLiked,
    isSaved,
  } = useCommunity();

  // Post not found
  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Post Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The community post you're looking for doesn't
            exist.
          </p>

          <Link
            to="/community"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Community
          </Link>

        </div>

      </main>
    );
  }

  const liked = isLiked(post.id);
  const saved = isSaved(post.id);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Community
        </Link>

        {/* Post */}
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* User */}
          <div className="flex items-center gap-3 p-5">

            <img
              src={post.userAvatar}
              alt={post.userName}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-gray-900">
                {post.userName}
              </h2>

              <p className="text-sm text-gray-500">
                {post.category}
              </p>
            </div>

          </div>

          {/* Image */}
          <div className="bg-gray-100">

            <img
              src={post.image}
              alt={post.caption}
              className="max-h-162.5 w-full object-cover"
            />

          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

            <div className="flex items-center gap-6">

              {/* Like */}
              <button
                type="button"
                onClick={() =>
                  toggleLike(post.id)
                }
                className="flex items-center gap-2 text-gray-600 transition hover:text-red-500"
                aria-label={
                  liked
                    ? "Unlike post"
                    : "Like post"
                }
              >
                <Heart
                  size={22}
                  className={
                    liked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }
                />

                <span className="text-sm">
                  {post.likes +
                    (liked ? 1 : 0)}{" "}
                  Likes
                </span>
              </button>

              {/* Comments */}
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle size={22} />

                <span className="text-sm">
                  {post.comments} Comments
                </span>
              </div>

            </div>

            {/* Save */}
            <button
              type="button"
              onClick={() =>
                toggleSave(post.id)
              }
              aria-label={
                saved
                  ? "Unsave post"
                  : "Save post"
              }
            >
              <Bookmark
                size={22}
                className={
                  saved
                    ? "fill-blue-600 text-blue-600"
                    : "text-gray-600"
                }
              />
            </button>

          </div>

          {/* Caption */}
          <div className="p-5">

            <p className="leading-7 text-gray-700">

              <span className="mr-2 font-semibold text-gray-900">
                {post.userName}
              </span>

              {post.caption}

            </p>

            <p className="mt-4 text-sm text-gray-400">
              Posted on{" "}
              {new Date(
                post.createdAt
              ).toLocaleDateString("en-IN")}
            </p>

          </div>

        </article>

        {/* Comments */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">

          <h2 className="text-xl font-bold text-gray-900">
            Comments
          </h2>

          <div className="mt-5 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Comments are currently mocked for this
              assignment.
            </p>
          </div>

        </section>

      </div>

    </main>
  );
};

export default PostDetails;